import dotenv from 'dotenv'

// Ensure environment variables are loaded before configuring Cloudinary.
// This fixes cases where other modules import this file before the app's
// top-level dotenv.config() runs (imports are hoisted in ES modules).
dotenv.config()

import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function uploadToCloudinary(path:string){
  try{
    const result = await cloudinary.uploader.upload(path, { folder: 'sellora' })
    try{ fs.unlinkSync(path) }catch(e){}
    return result
  }catch(err:any){
    // Log the full error server-side for debugging (do not return sensitive details to clients)
    console.error('Cloudinary upload error:', err && (err.message || err))
    // Rethrow a sanitized error so callers can handle it appropriately
    const e: any = new Error('Cloudinary upload failed')
    e.original = err
    throw e
  }
}

export async function deleteFromCloudinary(publicId:string){
  try{
    return cloudinary.uploader.destroy(publicId)
  }catch(err:any){
    console.error('Cloudinary delete error:', err && (err.message || err))
    const e: any = new Error('Cloudinary delete failed')
    e.original = err
    throw e
  }
}
