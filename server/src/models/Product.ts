import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  images: [String]
}, { timestamps: true })

export default mongoose.model('Product', ProductSchema)
