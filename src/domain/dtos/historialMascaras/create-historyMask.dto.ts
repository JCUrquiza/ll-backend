
export class CreateHistoryMaskDto {

    constructor(
        public readonly idWrestlerWins: number,
        public readonly idWrestlerLoser: number,
        public readonly dateFight: Date,
    ) {}

    static create( props: {[key: string]: any} ): [string?, CreateHistoryMaskDto?] {

        const { idWrestlerWins, idWrestlerLoser, dateFight } = props;

        if ( !idWrestlerWins ) return ['idWrestlerWins is required', undefined]
        if ( !idWrestlerLoser ) return ['idWrestlerLoser is required', undefined]
        if ( idWrestlerWins === idWrestlerLoser ) {
            return ['The movement is not valid, the id´s are the same', undefined];
        }

        let newDateFight = dateFight;
        newDateFight = new Date(dateFight);
        if ( newDateFight.toString() === 'Invalid Date' ) {
            return ['dateFight must be a valid Date', undefined];
        }

        const idWrestlerW = +idWrestlerWins;
        const idWrestlerL = +idWrestlerLoser;
        const dateF = newDateFight.toISOString();

        return [undefined, new CreateHistoryMaskDto(idWrestlerW, idWrestlerL, dateF)]
    }

}


