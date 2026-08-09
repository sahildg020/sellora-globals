import express from 'express'
import multer from 'multer'
import auth from '../middleware/auth'
import Gallery from '../models/Gallery'
import { uploadToCloudinary } from '../utils/cloudinary'

const upload = multer({ dest: '/tmp' })
const router = express.Router()

router.post('/', auth, upload.single('file'), async (req:any,res)=>{
  const file = req.file
  const result = await uploadToCloudinary(file.path)
  const g = new Gallery({ public_id: result.public_id, url: result.secure_url, caption: req.body.caption })
  await g.save()
  res.json(g)
})

router.get('/', auth, async (req,res)=>{
  const items = await Gallery.find().sort({ createdAt: -1 })
  res.json(items)
})

router.delete('/:id', auth, async (req,res)=>{
  await Gallery.findByIdAndDelete(req.params.id)
  res.json({ ok: true })
})

export default router
