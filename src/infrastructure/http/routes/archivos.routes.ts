import { Router } from 'express'
import {ArchivosController} from '../controllers/archivos.controller.js'
import { upload } from '../middleware/multer.middleware.js'
export class AppRoutes{

    static get routes():Router{
        const router = Router()
        const controller = new ArchivosController
        router.post('/upload', upload.single('file'),controller.uploadFile)       
        return router
    }
    
}
