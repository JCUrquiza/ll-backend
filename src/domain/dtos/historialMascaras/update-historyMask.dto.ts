
export class UpdateHistoryMaskDto {

    constructor(
        public readonly luchadorGanadorId?: number,
        public readonly luchadorVencidoId?: number,
        public readonly fechaLucha?: Date,
    ) {}

    get values() {
        const returnObj: {[key: string]: any} = {};

        if ( this.luchadorGanadorId ) returnObj.luchadorGanadorId = this.luchadorGanadorId;
        if ( this.luchadorVencidoId ) returnObj.luchadorVencidoId = this.luchadorVencidoId;
        if ( this.fechaLucha ) returnObj.fechaLucha = this.fechaLucha;

        return returnObj;
    }

    static create( props: {[key: string]: any} ): [string?, UpdateHistoryMaskDto?] {
        const { luchadorGanadorId, luchadorVencidoId, fechaLucha } = props;

        let newFechaLucha = fechaLucha;
        if ( fechaLucha ) {
            newFechaLucha = new Date( fechaLucha );
            if ( newFechaLucha.toString() === 'Invalid Date' ) {
                return ['fechaLucha must be a valid date', undefined]
            }
        }

        const idLuchadorW = +luchadorGanadorId;
        const idLuchadorL = +luchadorVencidoId;

        return [undefined, new UpdateHistoryMaskDto(idLuchadorW, idLuchadorL, newFechaLucha)];
    }

}


