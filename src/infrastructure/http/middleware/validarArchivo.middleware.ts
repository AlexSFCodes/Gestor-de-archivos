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

    middlewareMultiple(req: Request, res: Response, next: NextFunction) {
        if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
            return res.status(400).json({ message: "No se enviaron archivos" })
        }

        for (const file of req.files as Express.Multer.File[]) {
            const { mimetype, filename, size } = file;
            const [error] = UploadFileDto.create(mimetype, filename, size)
            if (error) {
                return res.status(400).json({ message: `Archivo ${filename} inválido: ${(error as Error).message}` })
            }
        }
        next();
    }
}