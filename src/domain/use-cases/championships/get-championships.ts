import { ChampionshipEntity } from '../../entities/championship.entity';
import { ChampionshipRepository } from '../../repositories/championship.repository';


export interface GetChampionshipsUseCase {
    execute(): Promise<ChampionshipEntity[]>
}

export class GetChampionships implements GetChampionshipsUseCase {

    constructor(
        private readonly repository: ChampionshipRepository,
    ) {}

    execute(): Promise<ChampionshipEntity[]> {
        return this.repository.getAll();
    }

}

