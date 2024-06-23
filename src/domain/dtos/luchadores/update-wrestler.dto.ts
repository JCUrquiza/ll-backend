enum Estilo { Rudo = 'Rudo', Tecnico = 'Tecnico' }
enum Genero { Hombre = 'Hombre', Mujer = 'Mujer' }

export class UpdateWrestlerDto {

    constructor(
        public readonly nombre?: string,
        public readonly estilo?: Estilo,
        public readonly peso?: number,
        public readonly altura?: string,
        public readonly ciudadNacimiento?: string,
        public readonly aniosLuchador?: number,
        public readonly genero?: Genero,
        public readonly debut?: Date
    ) {}

    get values() {
        const returnObj: {[key: string]: any} = {};

        if (this.nombre) returnObj.nombre = this.nombre;
        if (this.estilo) returnObj.estilo = this.estilo;
        if (this.peso) returnObj.peso = this.peso;
        if (this.altura) returnObj.altura = this.altura;
        if (this.ciudadNacimiento) returnObj.ciudadNacimiento = this.ciudadNacimiento;
        if (this.aniosLuchador) returnObj.aniosLuchador = this.aniosLuchador;
        if (this.genero) returnObj.genero = this.genero;
        if (this.debut) returnObj.debut = this.debut;

        return returnObj;
    }

    static create( props: {[key: string]: any} ): [string?, UpdateWrestlerDto?] {
        const { nombre, estilo, peso, altura, ciudadNacimiento, aniosLuchador, genero, debut } = props;
    
        let newDebut = debut;
        if (debut) {
            newDebut = new Date(debut);
            if ( newDebut.toString() === 'Invalid Date' ) {
                return ['debut must be a valid Date', undefined];
            }
        }

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

        return [
            undefined,
            new UpdateWrestlerDto(nombre, estilo, peso, altura, ciudadNacimiento, aniosLuchador, genero, newDebut)
        ];
    }

}

