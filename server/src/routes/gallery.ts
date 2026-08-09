import express from 'express'
import multer from 'multer'
import auth from '../middleware/auth'
import Gallery from '../models/Gallery'
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary'

const upload = multer({ dest: '/tmp' })
const router = express.Router()

router.post('/', auth, upload.single('file'), async (req:any,res)=>{
  const file = req.file
  if(!file) return res.status(400).json({ message: 'No file uploaded' })
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
  const g = await Gallery.findById(req.params.id)
  if(!g) return res.status(404).json({ message: 'Not found' })
  try{
    if(g.public_id) await deleteFromCloudinary(g.public_id)
  }catch(e){ console.error('Cloudinary delete failed', e) }
  await Gallery.findByIdAndDelete(req.params.id)
  res.json({ ok: true })
})

export default router
