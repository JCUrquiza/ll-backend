
export class UpdateChampionshipDto {

    private constructor(
        public readonly id: number,
        public readonly nombre?: string,
        public readonly rangoPeso?: string,
        public readonly anioFundacion?: string,
    ) {}

    get values() {
        const returnObj: {[key:string]: any} = {};

        if ( this.nombre ) returnObj.nombre = this.nombre;
        if ( this.rangoPeso ) returnObj.rangoPeso = this.rangoPeso;
        if ( this.anioFundacion ) returnObj.anioFundacion = this.anioFundacion;

        return returnObj;
    }

    static create( props: {[key: string]: any} ): [string?, UpdateChampionshipDto?] {

        const { id, nombre, rangoPeso, anioFundacion } = props;

        if ( !id || isNaN( Number(id) ) ) {
            return ['Id must be a valid number', undefined]
        }

        // if ( !nombre ) return ['Name is required', undefined];
        // if ( !rangoPeso ) return ['Rangopeso is required', undefined];
        // if ( !anioFundacion ) return ['Year of fundation is required', undefined];

        return [undefined, new UpdateChampionshipDto(id, nombre, rangoPeso, anioFundacion)];
    }

}


