enum Estilo { Rudo = 'Rudo', Tecnico = 'Tecnico' }
enum Genero { Hombre = 'Hombre', Mujer = 'Mujer' }


export class ReadWrestlerDto {

    constructor(
        public readonly estilo?: string,
        public readonly ciudadNacimiento?: string,
        public readonly genero?: string,
    ) {}

    get values() {
        const returnObj: {[ket: string]: any} = {};

        if ( this.estilo ) returnObj.estilo = this.estilo; 
        if ( this.ciudadNacimiento ) returnObj.ciudadNacimiento = this.ciudadNacimiento; 
        if ( this.genero ) returnObj.genero = this.genero; 

        return returnObj;
    }

    static create( props: {[key: string]: any} ): [string?, ReadWrestlerDto?] {
        const { estilo, ciudadNacimiento, genero } = props;

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

        return [undefined, new ReadWrestlerDto(estilo, ciudadNacimiento, genero)];
    }

}

