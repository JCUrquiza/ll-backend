import { prisma } from '../../data/postgres';
import { CreateChampionshipDto, UpdateChampionshipDto } from '../../domain';
import { ChampionshipDatasource } from '../../domain/datasources/championship.datasource';
import { ChampionshipEntity } from '../../domain/entities/championship.entity';


export class ChampionshipDatasourceImpl implements ChampionshipDatasource {

    create(createCompanyDto: CreateChampionshipDto): Promise<ChampionshipEntity> {
        throw new Error('Method not implemented.');
    }

    async getAll(): Promise<ChampionshipEntity[]> {
        const championships = await prisma.campeonatos.findMany();
        return championships.map( championship => ChampionshipEntity.fromObject(championship) );
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

