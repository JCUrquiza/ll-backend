import { CompanyEntity } from '../../entities/company.entity';
import { CompanyRepository } from '../../repositories/company.repository';


export interface DeleteCompanyUseCase {
    execute(id: number): Promise<CompanyEntity>
}

export class DeleteCompany implements DeleteCompanyUseCase {

    constructor(
        private readonly repository: CompanyRepository,
    ) {}

    execute(id: number): Promise<CompanyEntity> {
        return this.repository.deleteById(id);
    }

}

