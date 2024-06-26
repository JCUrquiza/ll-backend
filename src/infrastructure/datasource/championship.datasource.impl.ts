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
        if ( championships.length === 0 ) throw 'There are no championships';
        return championships.map( championship => ChampionshipEntity.fromObject(championship) );
    }

    async findById(id: number): Promise<ChampionshipEntity> {
        const championship = await prisma.campeonatos.findUnique({
            where: { id }
        });
        if ( !championship ) throw `Championship with id ${id} not found`;

        return ChampionshipEntity.fromObject(championship);
    }

    updateById(updateCompanyDto: UpdateChampionshipDto): Promise<ChampionshipEntity> {
        throw new Error('Method not implemented.');
    }

    async deleteById(id: number): Promise<ChampionshipEntity> {
        await this.findById(id);

        const deleteChampionship = await prisma.campeonatos.delete({
            where: { id }
        });

        return ChampionshipEntity.fromObject( deleteChampionship );
    }

}

