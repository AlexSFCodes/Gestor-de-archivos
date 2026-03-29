import type { Request, Response } from 'express'
import {RegisterUserDto} from '../../../domain/dtos/auth/register-user.dto.js'
import {LoginUserDto} from '../../../domain/dtos/auth/login-user.dto.js'
import bcryptjs from 'bcryptjs'
import {usuariosModel} from '../../database/model/usuario.model.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export class ArchivosAuthController {
    register = async (req: Request, res:Response)=>{
        const {name, email, password} = req.body;
        const [error, dto] = RegisterUserDto.create(name, email, password)
        if (error) return res.status(400).json({ message: "error" })
        const passwordHash = bcryptjs.hashSync(password,10)
        try {
            await new usuariosModel({name,password:passwordHash,email}).save();
            return res.status(200).json( {message: "muito belen"});
        } catch (error) {
            return res.status(400).json({message: "error"})
        }
    }
    login = async(req: Request, res:Response) => {
        const {email,password} = req.body;
        const usuario = await usuariosModel.findOne({ email })
        const [error, user] = LoginUserDto.create(email,password);
        if (error) return res.status(400).json({ message: "error" })
        
        if(!usuario){
            return res.status(400).json({message: "error"})
        }
        try {
            const passwordValido = await bcryptjs.compare(password, usuario.password)
    
            if (!passwordValido) return res.status(400).json({ message: 'Credenciales inválidas' })
            
            const token = jwt.sign(
                { id: usuario._id, email: usuario.email },
                process.env.JWT_SECRET || 'secreto',
                { expiresIn: '1d' }
            )
    
            return res.status(200).json({JWT: token})
            
        } catch (error) {
             return res.status(400).json({message: "error"})
        }
        
    }
}