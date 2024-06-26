
export class ChampionshipEntity {

    constructor(
        public readonly id: number,
        public nombre: string,
        public rangoPeso: string,
        public anioFundacion?: string,
    ) {}

    public static fromObject( object: {[key: string]: any} ): ChampionshipEntity {
        const { id, nombre, rangoPeso, anioFundacion } = object;

        if ( !id ) throw 'Id is required';
        if ( !nombre ) throw 'nombre is required';
        if ( !rangoPeso ) throw 'rangoPeso is required';
        
        return new ChampionshipEntity( id, nombre, rangoPeso, anioFundacion );
    }

}

