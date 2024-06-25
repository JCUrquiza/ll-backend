type Estilo = 'Rudo' | 'Tecnico';
type Genero = 'Hombre' | 'Mujer';

export class WrestlerEntity {

    constructor(
        public readonly id: number,
        public nombre: string,
        public estilo: Estilo,
        public peso: number,
        public altura: string,
        public ciudadNacimiento: string,
        public aniosLuchador: number,
        public genero: Genero,
        public debut: Date,
        public empresaId: number
    ) {}


    // Getters y Setters
    // get id(): number {
    //     return this._id;
    // }

    // get nombre(): string {
    //     return this._nombre;
    // }

    // set nombre(nombre: string) {
    //     if ( !nombre ) throw new Error('The name is empty');
    //     this._nombre = nombre;
    // }

    // Métodos de negocio
    // actualizarEstilo(nuevoEstilo: Estilo) {
    //     if (nuevoEstilo !== 'Rudo' && nuevoEstilo !== 'Tecnico') {
    //         throw new Error(`Estilo no válido: ${nuevoEstilo}`);
    //     }
    //     this.estilo = nuevoEstilo;
    // }

    public static fromObject( object: {[key: string]: any} ): WrestlerEntity {
        const { id, nombre, estilo, peso, altura, ciudadNacimiento, aniosLuchador, genero, debut, empresaId } = object;
        if ( !id ) throw 'Id is required';
        if ( !nombre ) throw 'Name is required';

        return new WrestlerEntity(
            id, nombre, estilo, peso, altura, ciudadNacimiento, aniosLuchador, genero, debut, empresaId
        )
    }

}

