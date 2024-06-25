import { prisma } from "../../data/postgres";
import { CreateCompanyDto, UpdateCompanyDto } from "../../domain";
import { CompanyDatasource } from "../../domain/datasources/company.datasource";
import { CompanyEntity } from "../../domain/entities/company.entity";


export class CompanyDatasourceImpl implements CompanyDatasource {

    create(createCompanyDto: CreateCompanyDto): Promise<CompanyEntity> {
        throw new Error("Method not implemented.");
    }

    async getAll(): Promise<CompanyEntity[]> {
        const companies = await prisma.empresas.findMany();
        return companies.map( company => CompanyEntity.fromObject(company) );
    }

    findById(id: number): Promise<CompanyEntity> {
        throw new Error("Method not implemented.");
    }
    updateById(updateCompanyDto: UpdateCompanyDto): Promise<CompanyEntity> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: number): Promise<CompanyEntity> {
        throw new Error("Method not implemented.");
    }

}

