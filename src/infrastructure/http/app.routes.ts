import {AppRoutes} from './routes/archivos.routes.js'
import {AuthRoutes} from './routes/auth.routes.js'
import { Router } from 'express'


export class    Routes{

    static get routes():Router{
        const router = Router()
        router.use('/api/files', AppRoutes.routes)
        router.use('/api/auth', AuthRoutes.routes)

        return router
    }
    
}
