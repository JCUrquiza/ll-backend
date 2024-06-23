enum Estilo { Rudo = 'Rudo', Tecnico = 'Tecnico' }
enum Genero { Hombre = 'Hombre', Mujer = 'Mujer' }

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
        if ( aniosLuchador !== undefined && isNaN(aniosLuchador) ) return ['Years must be number', undefined];

        // Convert the input style and gender to lowercase for comparison
        const inputEstilo = estilo ? estilo.toLowerCase() : undefined;
        const inputGenero = genero ? genero.toLowerCase() : undefined;
        // Validate estilo
        if (inputEstilo && !(Object.values(Estilo).map(e => e.toLowerCase()).includes(inputEstilo))) {
            return [`The style '${estilo}' not found. Only use '${Object.values(Estilo).join(' or ')}'`, undefined];
        }
        // Validate genero
        if (inputGenero && !(Object.values(Genero).map(g => g.toLowerCase()).includes(inputGenero))) {
            return [`The gender '${genero}' not found. Only use '${Object.values(Genero).join(' or ')}'`, undefined];
        }

        return [undefined, new CreateWrestlerDto(nombre, estilo, genero, aniosLuchador)];
    }

}

