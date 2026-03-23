import type { Request, Response } from 'express'
import {CustomError} from '../../../domain/errors/custom.error.js'
import {ArchivoModel} from '../../database/model/archivo.model.js'
export class ArchivosController{
    uploadFile = async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No se envió ningún archivo' })
    }
    const { path, filename, size, mimetype } = req.file
    const createdAt = new Date()
    try {
        await new ArchivoModel({ path, filename, size, mimetype }).save()
    return res.status(200).json({ path, filename, size, mimetype })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error al guardar el archivo' })
    }


    }

/*  uploadMultipleFiles = (req: Request, res: Response) => {
        if (!req.files) {
            return res.status(400).json({ message: 'No se enviaron archivos' })
        }
    }
    getFiles=(req:Request,res:Response)=>{


    }
    deleteFile=(req:Request,res:Response)=>{

    } */

}