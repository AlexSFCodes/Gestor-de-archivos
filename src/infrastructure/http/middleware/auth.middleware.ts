
import type {Request, Response, NextFunction } from 'express'
import jwt, {type JwtPayload } from 'jsonwebtoken'
export class authMiddleware{
    static middleware = async (req: Request, res:Response, next: NextFunction)=>{
        const authHeader = req.headers.authorization
        if (!authHeader) return res.status(401).json({ message: 'No autorizado' })
        const token = authHeader.split(' ')[1]  
        if (!token) return res.status(401).json({ message: 'No autorizado' })
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET || 'secreto')
            req.user = payload as JwtPayload
            next()
        } catch {
            return res.status(401).json({ message: 'Token inválido' })
        }
    }
}
