import { CreateCompanyDto } from '../dtos/companies/create-company.dto';
import { UpdateCompanyDto } from '../dtos/companies/update-company.dto';
import { CompanyEntity } from '../entities/company.entity';


export abstract class CompanyRepository {

    abstract create( createCompanyDto: CreateCompanyDto ): Promise<CompanyEntity>;
    abstract getAll(): Promise<CompanyEntity[]>;
    abstract findById( id: number ): Promise<CompanyEntity>;
    abstract updateById( updateCompanyDto: UpdateCompanyDto ): Promise<CompanyEntity>;
    abstract deleteById( id: number ): Promise<CompanyEntity>;

}

