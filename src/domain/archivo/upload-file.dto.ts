
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
        return [null, new UploadFileDto(mimetype, filename, size)]
    }
}