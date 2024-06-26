import { CompanyEntity } from '../../entities/company.entity';
import { CompanyRepository } from '../../repositories/company.repository';


export interface GetCompanyUseCase {
    execute(id: number): Promise<CompanyEntity>
}

export class GetCompany implements GetCompanyUseCase {

    constructor(
        private readonly repository: CompanyRepository,
    ) {}

    execute(id: number): Promise<CompanyEntity> {
        return this.repository.findById(id);
    }

}

