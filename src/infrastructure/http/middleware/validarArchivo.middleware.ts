import type { Request, Response,NextFunction } from 'express'
import {UploadFileDto} from '../../../domain/dtos/archivo/upload-file.dto.js'
export class ValidateFile{
    middleware(req:Request,res: Response, next:NextFunction){
        if(!req.file)
        { return res.status(400).json({ message: "error" })
        }
        const {mimetype, filename, size} = req.file;
        const [error, dto] = UploadFileDto.create(mimetype, filename, size)
        if (error) return res.status(400).json({ message: "error" })
        next();
    }
}