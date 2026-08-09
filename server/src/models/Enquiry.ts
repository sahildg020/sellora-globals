import mongoose from 'mongoose'

const EnquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
}, { timestamps: true })

export default mongoose.model('Enquiry', EnquirySchema)
