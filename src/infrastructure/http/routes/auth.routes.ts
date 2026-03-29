import { Router } from 'express'
/* import {ArchivosController} from '../controllers/archivos.controller.js' */
import {ArchivosAuthController} from '../controllers/auth.controller.js'
export class AuthRoutes{

    static get routes():Router{
        const router = Router()
        const controlador = new ArchivosAuthController  

        router.post('/register',controlador.register)       
        router.post('/login',controlador.login)
        return router
    }
    
}