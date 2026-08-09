import express from 'express'
import Product from '../models/Product'
import auth from '../middleware/auth'

const router = express.Router()

router.get('/', async (req,res)=>{
  const items = await Product.find().sort({ createdAt: -1 })
  res.json(items)
})

router.post('/', auth, async (req,res)=>{
  const p = new Product(req.body)
  await p.save()
  res.json(p)
})

router.put('/:id', auth, async (req,res)=>{
  const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(p)
})

router.delete('/:id', auth, async (req,res)=>{
  await Product.findByIdAndDelete(req.params.id)
  res.json({ ok: true })
})

export default router
