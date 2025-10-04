export class MessageDTO{
    id!: number; //Operador de Asignacion Definitiva (Le decimos al compilador que sabemos con certeza que la propiedad será inicializada, normalmente fuera del constructor)
    title: string;
    description: string;

    constructor(title: string, description: string){
        this.title = title;
        this.description = description;
    }
}
