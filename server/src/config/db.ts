import mongoose from 'mongoose'

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/sellora'

export default async function connectDB(){
  await mongoose.connect(uri)
  mongoose.connection.on('connected', ()=> console.log('MongoDB connected'))
  mongoose.connection.on('error', (err)=> console.error('MongoDB error', err))
}
