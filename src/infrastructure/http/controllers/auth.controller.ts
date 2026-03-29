import type { Request, Response } from 'express'
import {RegisterUserDto} from '../../../domain/dtos/auth/register-user.dto.js'
import bcryptjs from 'bcryptjs'
import {usuariosModel} from '../../database/model/usuario.model.js'
/* import { CustomError } from '../../../domain/errors/custom.error.js'
import { ArchivoModel } from '../../database/model/archivo.model.js' */
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
}