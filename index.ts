import express from 'express'
import { Routes } from './src/infrastructure/http/app.routes.js'
import {MongoDB} from './src/infrastructure/database/mongodb.js'

const conection = MongoDB.getInstance()
class Server {
    private app = express()
    private port = process.env.PORT || 3000

    start() {
        conection.connect();
        this.app.use(express.json())
        
        // 2. conectar las rutas
        this.app.use(Routes.routes)
        
        // 3. levantar el servidor
        this.app.listen(this.port, () => {
            console.log(`🚀 Servidor en http://localhost:${this.port}`)
        })
    }
    }

new Server().start()