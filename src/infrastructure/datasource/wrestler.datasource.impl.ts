import { prisma } from '../../data/postgres';
import { CreateWrestlerDto, UpdateWrestlerDto, WrestlerDatasource, WrestlerEntity } from '../../domain';


export class WrestlerDatasourceImpl implements WrestlerDatasource {

    create(createWrestlerDto: CreateWrestlerDto): Promise<WrestlerEntity> {
        throw new Error('Method not implemented.');
    }
    async getAll(): Promise<WrestlerEntity[]> {
        const luchadores = await prisma.luchadores.findMany({
            include: {
                empresa: true
            }
        });
        return luchadores.map( luchador => WrestlerEntity.fromObject(luchador) );
    }
    findById(id: number): Promise<WrestlerEntity> {
        throw new Error('Method not implemented.');
    }
    updateById(updateWre: UpdateWrestlerDto): Promise<WrestlerEntity> {
        throw new Error('Method not implemented.');
    }
    deleteById(id: number): Promise<WrestlerEntity> {
        throw new Error('Method not implemented.');
    }

}

