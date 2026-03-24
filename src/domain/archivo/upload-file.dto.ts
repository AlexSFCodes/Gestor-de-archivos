
export class UploadFileDto { 
    
    
    public mimetype: string   
    public size: number   
    public filename: string   
    
    constructor(mimetype: string, filename: string, size: number) {
        this.mimetype = mimetype
        this.filename = filename
        this.size = size
    }

    static create(mimetype: string, filename: string, size: number) {
        if (!mimetype || !filename || !size) {
            return [new Error('Faltan datos'), null]
        }
    const tiposPermitidos = ['image/png', 'image/jpeg', 'application/pdf']
    if (!tiposPermitidos.includes(mimetype)) {
        return [new Error('Solo se permiten png, jpg o pdf'), null]
    }
        if (size>5242880) {
            return [new Error('muy pesado'), null]
        }
        return [null, new UploadFileDto(mimetype, filename, size)]
    }
}