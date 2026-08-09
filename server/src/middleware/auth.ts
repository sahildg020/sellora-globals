import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export default function auth(req: any, res: Response, next: NextFunction){
  const header = req.headers.authorization || ''
  if(!header || !header.startsWith('Bearer ')) return res.status(401).json({ message: 'No token' })
  const token = header.split(' ')[1]
  try{
    const decoded:any = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    req.user = decoded
    next()
  }catch(err){
    return res.status(401).json({ message: 'Invalid token' })
  }
}
