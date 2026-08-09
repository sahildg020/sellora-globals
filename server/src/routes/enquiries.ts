import express from 'express'
import Enquiry from '../models/Enquiry'
import Product from '../models/Product'
import sendEnquiryMail from '../utils/mailer'

const router = express.Router()

router.post('/', async (req,res)=>{
  const { name, email, message, productId } = req.body
  const product = productId ? await Product.findById(productId) : null
  const e = new Enquiry({ name, email, message, product: product?._id })
  await e.save()
  // send email notification
  sendEnquiryMail({ name, email, message, product })
  res.json(e)
})

router.get('/', async (req,res)=>{
  const list = await Enquiry.find().populate('product')
  res.json(list)
})

export default router
