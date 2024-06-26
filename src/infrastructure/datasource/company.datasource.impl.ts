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

    async findById(id: number): Promise<CompanyEntity> {
        const company = await prisma.empresas.findUnique({
            where: {id}
        });
        if ( !company ) throw `Company with id ${id} not found`

        return CompanyEntity.fromObject(company);
    }
    
    updateById(updateCompanyDto: UpdateCompanyDto): Promise<CompanyEntity> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: number): Promise<CompanyEntity> {
        throw new Error("Method not implemented.");
    }

}

