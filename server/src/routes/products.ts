import express from 'express'
import Product from '../models/Product'
import auth from '../middleware/auth'
import multer from 'multer'
import { uploadToCloudinary } from '../utils/cloudinary'

const router = express.Router()
const upload = multer({ dest: '/tmp' })

router.get('/', async (req,res)=>{
  const q:any = {}
  if(req.query.category) q.category = req.query.category
  if(req.query.featured) q.featured = true
  const items = await Product.find(q).sort({ createdAt: -1 })
  res.json(items)
})

router.get('/slug/:slug', async (req,res)=>{
  const p = await Product.findOne({ slug: req.params.slug })
  if(!p) return res.status(404).json({ message: 'Not found' })
  res.json(p)
})

router.post('/', auth, upload.array('images', 6), async (req:any,res)=>{
  const body = req.body
  const files = req.files || []
  const images:string[] = []
  for(const f of files){
    const r:any = await uploadToCloudinary(f.path)
    images.push(r.secure_url)
  }
  const prod = new Product({
    name: body.name,
    slug: body.slug,
    category: body.category,
    shortDescription: body.shortDescription,
    description: body.description,
    images,
    features: body.features ? JSON.parse(body.features) : [],
    specifications: body.specifications,
    featured: body.featured === 'true',
    available: body.available === 'true'
  })
  await prod.save()
  res.json(prod)
})

router.put('/:id', auth, upload.array('images',6), async (req:any,res)=>{
  const files = req.files || []
  const images:string[] = []
  for(const f of files){
    const r:any = await uploadToCloudinary(f.path)
    images.push(r.secure_url)
  }
  const body = req.body
  const update:any = { ...body }
  if(images.length) update.images = images
  if(update.features && typeof update.features === 'string'){
    try{ update.features = JSON.parse(update.features) }catch(e){}
  }
  const p = await Product.findByIdAndUpdate(req.params.id, update, { new: true })
  res.json(p)
})

router.delete('/:id', auth, async (req,res)=>{
  await Product.findByIdAndDelete(req.params.id)
  res.json({ ok: true })
})

router.post('/:id/toggle-feature', auth, async (req,res)=>{
  const p = await Product.findById(req.params.id)
  if(!p) return res.status(404).json({ message: 'Not found' })
  p.featured = !p.featured
  await p.save()
  res.json(p)
})

router.post('/:id/toggle-available', auth, async (req,res)=>{
  const p = await Product.findById(req.params.id)
  if(!p) return res.status(404).json({ message: 'Not found' })
  p.available = !p.available
  await p.save()
  res.json(p)
})

export default router
