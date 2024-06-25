
export class CompanyEntity {

    constructor(
        public readonly id: number,
        public nombre: string,
        public abreviatura: string,
    ) {}

    public static fromObject( object: {[key: string]: any} ): CompanyEntity {
        const { id, nombre, abreviatura } = object;

        if ( !id ) throw 'Id is required';
        if ( !nombre ) throw 'nombre is required';
        if ( !abreviatura ) throw 'abreviatura is required';

        return new CompanyEntity( id, nombre, abreviatura );
    }

}

