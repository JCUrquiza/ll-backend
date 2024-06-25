import { CreateCompanyDto, UpdateCompanyDto } from '../../domain';
import { CompanyDatasource } from '../../domain/datasources/company.datasource';
import { CompanyEntity } from '../../domain/entities/company.entity';
import { CompanyRepository } from '../../domain/repositories/company.repository';


export class CompanyRepositoryImpl implements CompanyRepository {

    constructor(
        private readonly datasource: CompanyDatasource
    ) {}

    create(createCompanyDto: CreateCompanyDto): Promise<CompanyEntity> {
        throw new Error('Method not implemented.');
    }

    getAll(): Promise<CompanyEntity[]> {
        return this.datasource.getAll();
    }

    findById(id: number): Promise<CompanyEntity> {
        throw new Error('Method not implemented.');
    }
    updateById(updateCompanyDto: UpdateCompanyDto): Promise<CompanyEntity> {
        throw new Error('Method not implemented.');
    }
    deleteById(id: number): Promise<CompanyEntity> {
        throw new Error('Method not implemented.');
    }

}

