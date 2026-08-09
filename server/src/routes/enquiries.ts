import express from 'express'
import Enquiry from '../models/Enquiry'
import Product from '../models/Product'
import sendEnquiryMail from '../utils/mailer'
import auth from '../middleware/auth'

const router = express.Router()

router.post('/', async (req,res)=>{
  const { fullName, companyName, email, phone, country, productId, productName, quantity, message } = req.body
  if(!fullName || !email || !country || !message) return res.status(400).json({ message: 'Missing required fields' })
  const product = productId ? await Product.findById(productId) : null
  const e = new Enquiry({ fullName, companyName, email, phone, country, product: product?._id, productName: productName || product?.name, quantity, message })
  await e.save()
  // send email notification
  try{ await sendEnquiryMail({ fullName, email, message, product }) }catch(err){ console.error('Email failed', err) }
  res.json(e)
})

router.get('/', auth, async (req,res)=>{
  const q:any = {}
  if(req.query.status) q.status = req.query.status
  if(req.query.search) q.$or = [ { fullName: new RegExp(req.query.search as string,'i') }, { email: new RegExp(req.query.search as string,'i') }, { productName: new RegExp(req.query.search as string,'i') } ]
  const list = await Enquiry.find(q).populate('product').sort({ createdAt: -1 })
  res.json(list)
})

router.put('/:id/status', auth, async (req,res)=>{
  const { status } = req.body
  if(!status) return res.status(400).json({ message: 'Missing status' })
  const e = await Enquiry.findById(req.params.id)
  if(!e) return res.status(404).json({ message: 'Not found' })
  e.status = status
  await e.save()
  res.json(e)
})

export default router
