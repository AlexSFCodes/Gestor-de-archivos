import { Router } from 'express'
import {ArchivosController} from '../controllers/archivos.controller.js'
import { upload } from '../middleware/multer.middleware.js'
import {ValidateFile} from '../middleware/validarArchivo.middleware.js'
import {authMiddleware} from '../middleware/auth.middleware.js'
export class AppRoutes{

    static get routes():Router{
        const router = Router()
        const controller = new ArchivosController
        const validatermiddleware = new ValidateFile
        router.post('/upload',authMiddleware.middleware, upload.single('file'),validatermiddleware.middleware ,controller.uploadFile)       
        return router
    }
    
}
