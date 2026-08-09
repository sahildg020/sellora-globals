import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/User'

const router = express.Router()

router.post('/login', async (req,res)=>{
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if(!user) return res.status(401).json({ message: 'Invalid credentials' })
  const ok = await bcrypt.compare(password, user.password)
  if(!ok) return res.status(401).json({ message: 'Invalid credentials' })
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' })
  res.json({ token })
})

router.get('/me', async (req:any,res)=>{
  const auth = req.headers.authorization || ''
  if(!auth.startsWith('Bearer ')) return res.status(401).json({})
  try{
    const token = auth.split(' ')[1]
    const decoded:any = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    const user = await User.findById(decoded.id).select('-password')
    res.json(user)
  }catch(e){ res.status(401).json({}) }
})

export default router
