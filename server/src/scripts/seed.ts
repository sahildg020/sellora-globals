import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import connectDB from '../config/db'
import User from '../models/User'
import Product from '../models/Product'

dotenv.config()

async function seed(){
  await connectDB()
  console.log('Connected')
  const adminEmail = process.env.ADMIN_EMAIL
  const adminPass = process.env.ADMIN_PASSWORD
  if(!adminEmail || !adminPass) return console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD in env')
  await User.deleteMany({})
  const pw = await bcrypt.hash(adminPass, 10)
  await User.create({ email: adminEmail, password: pw, role: 'admin' })
  await Product.deleteMany({})
  await Product.create({ name: 'Sample Product', slug: 'sample-product', category: 'Kitchen Products', shortDescription: 'Demo product', description: 'Demo product description', price: 100, images: [] })
  console.log('Seeded')
  process.exit(0)
}

seed().catch(e=>{ console.error(e); process.exit(1) })
