import { Schema, model } from 'mongoose'

const archivoSchema = new Schema({
    filename: { type: String, required: true },
    size: { type: Number, required: true },
    mimetype: { type: String, required: true },
    path: { type: String, required: true },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }
},{timestamps:true}

)

export const ArchivoModel = model('Archivo', archivoSchema)