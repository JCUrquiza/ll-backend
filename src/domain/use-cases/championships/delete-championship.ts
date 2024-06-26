import { ChampionshipEntity } from '../../entities/championship.entity';
import { ChampionshipRepository } from '../../repositories/championship.repository';


export interface DeleteChampionshipUseCase {
    execute(id: number): Promise<ChampionshipEntity>
}

export class DeleteChampionship implements DeleteChampionshipUseCase {

    constructor(
        private readonly repository: ChampionshipRepository
    ) {}

    execute(id: number): Promise<ChampionshipEntity> {
        return this.repository.deleteById(id);
    }

}

