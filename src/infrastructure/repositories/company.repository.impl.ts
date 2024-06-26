import { CreateCompanyDto, UpdateCompanyDto } from '../../domain';
import { CompanyDatasource } from '../../domain/datasources/company.datasource';
import { CompanyEntity } from '../../domain/entities/company.entity';
import { CompanyRepository } from '../../domain/repositories/company.repository';


export class CompanyRepositoryImpl implements CompanyRepository {

    constructor(
        private readonly datasource: CompanyDatasource
    ) {}

    create(createCompanyDto: CreateCompanyDto): Promise<CompanyEntity> {
        return this.datasource.create( createCompanyDto );
    }

    getAll(): Promise<CompanyEntity[]> {
        return this.datasource.getAll();
    }

    findById(id: number): Promise<CompanyEntity> {
        return this.datasource.findById(id);
    }

    updateById(updateCompanyDto: UpdateCompanyDto): Promise<CompanyEntity> {
        return this.datasource.updateById(updateCompanyDto);
    }
    
    deleteById(id: number): Promise<CompanyEntity> {
        return this.datasource.deleteById(id);
    }

}

