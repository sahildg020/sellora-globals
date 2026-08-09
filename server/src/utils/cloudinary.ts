import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function uploadToCloudinary(path:string){
  const result = await cloudinary.uploader.upload(path, { folder: 'sellora' })
  try{ fs.unlinkSync(path) }catch(e){}
  return result
}
