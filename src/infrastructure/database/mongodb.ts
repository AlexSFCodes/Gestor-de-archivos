import 'dotenv/config'
import mongoose from 'mongoose'
export class MongoDB {
  private static instance: MongoDB
  private readonly uri: string

  private constructor() {
    this.uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/gestor-archivos'
  }

  static getInstance(): MongoDB {
    if (!MongoDB.instance) {
      MongoDB.instance = new MongoDB()
    }
    return MongoDB.instance
  }

  async connect(): Promise<void> {
    try {
      await mongoose.connect(this.uri)
      console.log('✅ MongoDB conectado')
    } catch (error) {
      console.error('Error al conectar MongoDB:', error)
      process.exit(1)
    }
  }

  async disconnect(): Promise<void> {
    await mongoose.disconnect()
    console.log('MongoDB desconectado')
  }
}