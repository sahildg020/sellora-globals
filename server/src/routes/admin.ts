import express from 'express'
import Product from '../models/Product'
import Enquiry from '../models/Enquiry'

const router = express.Router()

router.get('/stats', async (req,res)=>{
  const totalProducts = await Product.countDocuments()
  const featuredProducts = await Product.countDocuments({ featured: true })
  const totalEnquiries = await Enquiry.countDocuments()
  const newEnquiries = await Enquiry.countDocuments({ status: 'New' })
  const completedEnquiries = await Enquiry.countDocuments({ status: 'Completed' })
  res.json({ totalProducts, featuredProducts, totalEnquiries, newEnquiries, completedEnquiries })
})

export default router
