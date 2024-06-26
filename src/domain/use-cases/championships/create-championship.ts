import { CreateChampionshipDto } from '../../dtos/campeonatos/create-championship.dto';
import { ChampionshipEntity } from '../../entities/championship.entity';
import { ChampionshipRepository } from '../../repositories/championship.repository';


export interface CreateChampionshipUseCase {
    execute(dto: CreateChampionshipDto): Promise<ChampionshipEntity>
}

export class CreateChampionship implements CreateChampionshipUseCase{

    constructor(
        private readonly repository: ChampionshipRepository
    ) {}

    execute(dto: CreateChampionshipDto): Promise<ChampionshipEntity> {
        return this.repository.create(dto);
    }

}

