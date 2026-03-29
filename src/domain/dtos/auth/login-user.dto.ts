export class LoginUserDto {

    private email;
    private password;
    constructor( email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    static create(email: string, password: string) {
        if ( !email || !password) {
            return [new Error('Faltan datos'), null]
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return [new Error('Email inválido'), null]
        }
        if (password.length < 6) {
            return [new Error('Password mínimo 6 caracteres'), null]
        }
        return [null, new LoginUserDto( email, password)]
    }
}