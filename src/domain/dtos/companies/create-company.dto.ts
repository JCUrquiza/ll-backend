

export class CreateCompanyDto {

    constructor(
        public readonly nombre: string,
        public readonly abreviatura: string,
    ) {}

    static create( props: {[key: string]: any} ): [string?, CreateCompanyDto?] {

        const { nombre, abreviatura } = props;
        if ( !nombre ) return ['Name is required', undefined];
        if ( !abreviatura ) return ['Name is required', undefined];

        return [undefined, new CreateCompanyDto(nombre, abreviatura)];
    }

}

