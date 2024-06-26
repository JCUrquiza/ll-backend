import { UpdateChampionshipDto } from '../../dtos/campeonatos/update-championship.dto';
import { ChampionshipEntity } from '../../entities/championship.entity';
import { ChampionshipRepository } from '../../repositories/championship.repository';


export interface UpdateChampionshipUseCase {
    execute(dto: UpdateChampionshipDto): Promise<ChampionshipEntity>
}

export class UpdateChampionship implements UpdateChampionshipUseCase {

    constructor(
        private readonly repository: ChampionshipRepository
    ) {}

    execute(dto: UpdateChampionshipDto): Promise<ChampionshipEntity> {
        return this.repository.updateById(dto);
    }

}

