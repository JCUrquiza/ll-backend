

export class UpdateCompanyDto {

    constructor(
        public readonly id: number,
        public readonly nombre: string,
        public readonly abreviatura: string,
    ) {}

    get values() {
        const returnObj: {[key:string]: any} = {};

        if ( this.nombre ) returnObj.nombre = this.nombre;
        if ( this.abreviatura ) returnObj.abreviatura = this.abreviatura;

        return returnObj;
    }

    static create( props: {[key: string]: any} ): [string?, UpdateCompanyDto?] {
        const { id, nombre, abreviatura } = props;
        
        return [undefined, new UpdateCompanyDto(id, nombre, abreviatura)];
    } 

}


