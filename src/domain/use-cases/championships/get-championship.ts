import { ChampionshipEntity } from '../../entities/championship.entity';
import { ChampionshipRepository } from '../../repositories/championship.repository';


export interface GetChampionshipUseCase {
    execute(id: number): Promise<ChampionshipEntity>
}

export class GetChampionship implements GetChampionshipUseCase {

    constructor(
        private readonly repositpry: ChampionshipRepository
    ) {}

    execute(id: number): Promise<ChampionshipEntity> {
        return this.repositpry.findById(id);
    }

}
