import { CreateChampionshipDto } from "../dtos/campeonatos/create-championship.dto";
import { UpdateChampionshipDto } from "../dtos/campeonatos/update-championship.dto";
import { ChampionshipEntity } from "../entities/championship.entity";


export abstract class ChampionshipRepository {

    abstract create( createCompanyDto: CreateChampionshipDto ): Promise<ChampionshipEntity>;
    abstract getAll(): Promise<ChampionshipEntity[]>;
    abstract findById( id: number ): Promise<ChampionshipEntity>;
    abstract updateById( updateCompanyDto: UpdateChampionshipDto ): Promise<ChampionshipEntity>;
    abstract deleteById( id: number ): Promise<ChampionshipEntity>;

}

