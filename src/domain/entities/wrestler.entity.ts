
export class WrestlerEntity {

    constructor(
        public readonly _id: number,
        public _nombre: string,
    ) {}


    // Getters y Setters
    get id(): number {
        return this._id;
    }

    get nombre(): string {
        return this._nombre;
    }

    set nombre(nombre: string) {
        if ( !nombre ) throw new Error('The name is empty');
        this._nombre = nombre;
    }

}

