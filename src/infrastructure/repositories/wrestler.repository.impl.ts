import { CreateWrestlerDto, UpdateWrestlerDto, WrestlerDatasource, WrestlerEntity, WrestlerRepository } from '../../domain';


export class WrestlerRepositoryImpl implements WrestlerRepository{

    constructor(
        private readonly datasource: WrestlerDatasource,
    ) {}

    create(createWrestlerDto: CreateWrestlerDto): Promise<WrestlerEntity> {
        throw new Error('Method not implemented.');
    }
    getAll(): Promise<WrestlerEntity[]> {
        return this.datasource.getAll();
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


