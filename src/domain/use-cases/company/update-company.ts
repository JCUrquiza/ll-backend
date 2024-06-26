import { UpdateCompanyDto } from '../../dtos/companies/update-company.dto';
import { CompanyEntity } from '../../entities/company.entity';
import { CompanyRepository } from '../../repositories/company.repository';


export interface UpdateCompanyUseCase {
    execute(dto: UpdateCompanyDto): Promise<CompanyEntity>
}

export class UpdateCompany implements UpdateCompanyUseCase {

    constructor(
        private readonly repository: CompanyRepository,
    ) {}

    execute(dto: UpdateCompanyDto): Promise<CompanyEntity> {
        return this.repository.updateById( dto );
    }

}

