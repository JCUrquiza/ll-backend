import { CompanyEntity } from '../../entities/company.entity';
import { CompanyRepository } from '../../repositories/company.repository';


export interface GetCompaniesUseCase {
    execute(): Promise<CompanyEntity[]>
}

export class GetCompanies implements GetCompaniesUseCase {

    constructor(
        private readonly repository: CompanyRepository,
    ) {}

    execute(): Promise<CompanyEntity[]> {
        return this.repository.getAll();
    }

}

