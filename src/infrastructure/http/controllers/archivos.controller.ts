import type { Request, Response } from 'express'
import { CustomError } from '../../../domain/errors/custom.error.js'
import { ArchivoModel } from '../../database/model/archivo.model.js'
import fs from 'fs/promises'

export class ArchivosController {
    uploadFile = async (req: Request, res: Response) => {
        if (!req.file) {
            return res.status(400).json({ message: 'No se envió ningún archivo' })
        }
        const { id, email } = req.user!
        const { path, filename, size, mimetype } = req.file
        try {
            const archivo = await new ArchivoModel({ path, filename, size, mimetype, usuario: id }).save()
            return res.status(200).json(archivo)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Error al guardar el archivo' })
        }
    }

    uploadMultipleFiles = async (req: Request, res: Response) => {
        if (!req.files || !Array.isArray(req.files)) {
            return res.status(400).json({ message: 'No se enviaron archivos' })
        }
        const { id } = req.user!
        
        try {
            const archivosToSave = (req.files as Express.Multer.File[]).map(file => ({
                path: file.path,
                filename: file.filename,
                size: file.size,
                mimetype: file.mimetype,
                usuario: id
            }))
            
            const archivosGuardados = await ArchivoModel.insertMany(archivosToSave)
            return res.status(200).json(archivosGuardados)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Error al guardar los archivos' })
        }
    }

    getFiles = async (req: Request, res: Response) => {
        try {
            const { id } = req.user!
            const archivos = await ArchivoModel.find({ usuario: id })
            return res.status(200).json(archivos)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Error al obtener los archivos' })
        }
    }

    deleteFile = async (req: Request, res: Response) => {
        try {
            const { id } = req.user!
            const fileId = req.params.id

            const archivo = await ArchivoModel.findOne({ _id: fileId, usuario: id })
            if (!archivo) {
                return res.status(404).json({ message: 'Archivo no encontrado o no te pertenece' })
            }

            await fs.unlink(archivo.path).catch(err => console.log('Error borrando archivo fisico:', err))
            await ArchivoModel.deleteOne({ _id: fileId })

            return res.status(200).json({ message: 'Archivo eliminado correctamente' })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Error al eliminar el archivo' })
        }
    }
}