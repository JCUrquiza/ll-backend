
export class CreateChampionshipDto {

    constructor(
        public readonly nombre: string,
        public readonly rangoPeso: string,
        public readonly anioFundacion: string,
    ) {}

    static create( props: {[key: string]: any} ): [string?, CreateChampionshipDto?] {

        const { nombre, rangoPeso, anioFundacion } = props;
        if ( !nombre ) return ['Name is required', undefined];
        if ( !rangoPeso ) return ['Rangopeso is required', undefined];
        if ( !anioFundacion ) return ['Year of fundation is required', undefined];

        return [undefined, new CreateChampionshipDto(nombre, rangoPeso, anioFundacion)];
    }

}


