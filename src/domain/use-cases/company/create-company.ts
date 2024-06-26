import { CreateCompanyDto } from '../../dtos/companies/create-company.dto';
import { CompanyEntity } from '../../entities/company.entity';
import { CompanyRepository } from '../../repositories/company.repository';


export interface CreateCompanyUseCase {
    execute(dto: CreateCompanyDto): Promise<CompanyEntity>
}

export class CreateCompany implements CreateCompanyUseCase {

    constructor(
        private readonly repository: CompanyRepository,
    ) {}

    execute(dto: CreateCompanyDto): Promise<CompanyEntity> {
        return this.repository.create( dto );
    }

}

