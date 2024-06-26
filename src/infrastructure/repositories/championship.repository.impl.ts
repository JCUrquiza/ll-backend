import { CreateChampionshipDto, UpdateChampionshipDto } from '../../domain';
import { ChampionshipDatasource } from '../../domain/datasources/championship.datasource';
import { ChampionshipEntity } from '../../domain/entities/championship.entity';
import { ChampionshipRepository } from '../../domain/repositories/championship.repository';


export class ChampionshipRepositoryImpl implements ChampionshipRepository {

    constructor(
        private readonly datasource: ChampionshipDatasource
    ){}

    create(createCompanyDto: CreateChampionshipDto): Promise<ChampionshipEntity> {
        throw new Error('Method not implemented.');
    }
    getAll(): Promise<ChampionshipEntity[]> {
        return this.datasource.getAll();
    }
    findById(id: number): Promise<ChampionshipEntity> {
        throw new Error('Method not implemented.');
    }
    updateById(updateCompanyDto: UpdateChampionshipDto): Promise<ChampionshipEntity> {
        throw new Error('Method not implemented.');
    }
    deleteById(id: number): Promise<ChampionshipEntity> {
        throw new Error('Method not implemented.');
    }

}

