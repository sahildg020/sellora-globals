import mongoose from 'mongoose'

const GallerySchema = new mongoose.Schema({
  public_id: String,
  url: String,
  caption: String
}, { timestamps: true })

export default mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema)
