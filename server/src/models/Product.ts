import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  shortDescription: String,
  description: String,
  images: [String],
  features: [String],
  specifications: String,
  featured: { type: Boolean, default: false },
  available: { type: Boolean, default: true }
}, { timestamps: true })

export default mongoose.models.Product || mongoose.model('Product', ProductSchema)
