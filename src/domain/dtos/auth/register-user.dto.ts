export class RegisterUserDto {
    private name;
    private email;
    private password;
    constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static create(name: string, email: string, password: string) {
        if (!name || !email || !password) {
            return [new Error('Faltan datos'), null]
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return [new Error('Email inválido'), null]
        }
        if (password.length < 6) {
            return [new Error('Password mínimo 6 caracteres'), null]
        }
        return [null, new RegisterUserDto(name, email, password)]
    }
}