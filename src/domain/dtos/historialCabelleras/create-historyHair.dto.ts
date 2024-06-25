
export class CreateHistoryHairDto {

    constructor(
        public readonly luchadorGanadorId: number,
        public readonly luchadorVencidoId: number,
        public readonly fechaLucha: Date,
    ) {}

    static create( props: {[key: string]: any} ): [string?, CreateHistoryHairDto?] {

        const { luchadorGanadorId, luchadorVencidoId, fechaLucha } = props;

        if ( luchadorGanadorId === luchadorVencidoId ) return ['Incorrect. The Id´s are the same.', undefined];
        
        if ( !luchadorGanadorId ) return ['wrestlerWinsId is required', undefined];
        if ( !luchadorVencidoId ) return ['wrestlerLoserId is required', undefined];

        let newFechaLucha = fechaLucha;
        if ( fechaLucha ) {
            newFechaLucha = new Date( fechaLucha );
            if ( newFechaLucha.toString() === 'Invalid Date' ) {
                return ['fechaLucha must be a valid date', undefined]
            }
        }

        const idWrestlerW = +luchadorGanadorId;
        const idWrestlerL = +luchadorVencidoId;
        const dateF = newFechaLucha.toISOString();

        return [undefined, new CreateHistoryHairDto(idWrestlerW, idWrestlerL, dateF)];
    }

}


