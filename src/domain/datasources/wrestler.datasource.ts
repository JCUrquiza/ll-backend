import { CreateWrestlerDto } from '../dtos/luchadores/create-wreslter.dto';
import { UpdateWrestlerDto } from '../dtos/luchadores/update-wrestler.dto';
import { WrestlerEntity } from '../entities/wrestler.entity';


export abstract class WrestlerDatasource {

    abstract create( createWrestlerDto: CreateWrestlerDto ): Promise<WrestlerEntity>;

    // TODO: Paginación
    abstract getAll(): Promise<WrestlerEntity[]>;

    abstract findById( id: number ): Promise<WrestlerEntity>;
    abstract updateById( updateWre: UpdateWrestlerDto ): Promise<WrestlerEntity>;
    abstract deleteById( id: number ): Promise<WrestlerEntity>;

}

