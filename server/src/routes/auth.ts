import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
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

export default router
