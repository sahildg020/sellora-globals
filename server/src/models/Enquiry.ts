import mongoose from 'mongoose'

const EnquirySchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  companyName: String,
  email: { type: String, required: true },
  phone: String,
  country: { type: String, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  productName: String,
  quantity: String,
  message: { type: String, required: true },
  status: { type: String, enum: ['New','Contacted','In Progress','Completed','Rejected'], default: 'New' }
}, { timestamps: true })

export default mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema)
