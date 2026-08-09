import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db'
import authRoutes from './routes/auth'
import productRoutes from './routes/products'
import enquiryRoutes from './routes/enquiries'
import galleryRoutes from './routes/gallery'
import Admin from './routes/admin'
import errorHandler from './middleware/errorHandler'

dotenv.config()
const PORT = process.env.PORT || 4000

const app = express()
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json())

// connect to DB
connectDB().catch(err=>{ console.error('DB connection failed', err); process.exit(1) })

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/enquiries', enquiryRoutes)
app.use('/api/gallery', galleryRoutes)
app.use('/api/admin', Admin)

app.get('/', (req,res)=> res.send('Sellora Globals API'))

// error handler (last middleware)
app.use(errorHandler)

app.listen(PORT, ()=> console.log(`Server running on ${PORT}`))
