

export class CreateWrestlerDto {

    constructor(
        public readonly nombre: string,
        public readonly estilo: string,
        public readonly genero: string,
        public readonly aniosLuchador?: number,
        // public readonly debut?: Date
    ) {}

    static create( props: {[key: string]: any } ): [string?, CreateWrestlerDto?] {

        const { nombre, estilo, genero, aniosLuchador } = props;
        // let newDebut = debut;
        
        if ( !nombre ) return ['Name is required', undefined];
        if ( !estilo ) return ['Style is required', undefined];
        if ( !genero ) return ['Gender is required', undefined];
        if ( aniosLuchador !== undefined && isNaN(aniosLuchador) ) return ['Years must be number', undefined];

        // if ( debut ) {
        //     newDebut = new Date( debut );
        //     if ( newDebut.toString() === 'Invalid Date' ) {
        //         return ['CompletedAt must be a valid date', undefined];
        //     }
        // }

        return [undefined, new CreateWrestlerDto(nombre, estilo, genero, aniosLuchador)];
    }

}

