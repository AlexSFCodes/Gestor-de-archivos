import jwt from 'jsonwebtoken'
import type {Request, Response, NextFunction } from 'express'
export class authMiddleware{
    static middleware = async (req: Request, res:Response, next: NextFunction)=>{
        const authHeader = req.headers.authorization
        if (!authHeader) return res.status(401).json({ message: 'No autorizado' })
        const token = authHeader.split(' ')[1]  
        if (!token) return res.status(401).json({ message: 'No autorizado' })
        try {
            jwt.verify(token, process.env.JWT_SECRET || 'secreto')
            next()
        } catch {
            return res.status(401).json({ message: 'Token inválido' })
        }
    }
}