export class UserDTO {
    // Las propiedades se pueden declarar de forma concisa si usamos el shortcut del constructor
    email: string;
    password: string;
    name: string;
    surname1: string;
    surname2?: string; // ⬅️ Hacemos surname2 opcional
    alias?: string;    // ⬅️ Hacemos alias opcional
    birthDate: Date | string | null; // ⬅️ Más flexible para fechas

    constructor(
        email: string, 
        password: string, 
        name: string, 
        surname1: string, 
        // Parámetros opcionales deben ir al final
        surname2?: string, 
        alias?: string, 
        birthDate: Date | string | null = null // ⬅️ Valor por defecto si no se pasa
    ) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname1 = surname1;
        
        // Asigna el valor o un string vacío si es undefined
        this.surname2 = surname2;
        this.alias = alias;
        this.birthDate = birthDate;
    }
}