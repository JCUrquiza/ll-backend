
export class UpdateHistoryHairDto {

    constructor(
        public readonly id: number,
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

    static create( props: {[key: string]: any}): [string?, UpdateHistoryHairDto?] {

        const { id, luchadorGanadorId, luchadorVencidoId, fechaLucha } = props;

        if ( !id || isNaN( Number(id) ) ) {
            return ['Id must be a valid number..', undefined];
        }

        let newFechaLucha = fechaLucha;
        if ( fechaLucha ) {
            newFechaLucha = new Date( fechaLucha );
            if ( newFechaLucha.toString() === 'Invalid Date' ) {
                return ['fechaLucha must be a valid date', undefined]
            }
        }

        const idLuchadorW = +luchadorGanadorId;
        const idLuchadorL = +luchadorVencidoId;
        if ( idLuchadorW === idLuchadorL ) return ['Incorrect. The Id´s are the same', undefined];

        return [undefined, new UpdateHistoryHairDto(id, idLuchadorW, idLuchadorL, newFechaLucha)];
    }

}

