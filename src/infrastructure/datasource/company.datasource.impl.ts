import { prisma } from "../../data/postgres";
import { CreateCompanyDto, UpdateCompanyDto } from "../../domain";
import { CompanyDatasource } from "../../domain/datasources/company.datasource";
import { CompanyEntity } from "../../domain/entities/company.entity";


export class CompanyDatasourceImpl implements CompanyDatasource {


    async create(createCompanyDto: CreateCompanyDto): Promise<CompanyEntity> {
        const companyExist = await prisma.empresas.findFirst({
            where: {
                abreviatura: createCompanyDto.abreviatura
            }
        });
        if ( companyExist ) throw 'Company already exist'

        const newCompany = await prisma.empresas.create({
            data: createCompanyDto
        });
        return CompanyEntity.fromObject( newCompany );
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


    async updateById(updateCompanyDto: UpdateCompanyDto): Promise<CompanyEntity> {
        await this.findById(updateCompanyDto.id);

        const updateCompany = await prisma.empresas.update({
            where: { id: updateCompanyDto.id },
            data: updateCompanyDto.values
        });

        return CompanyEntity.fromObject( updateCompany );
    }


    async deleteById(id: number): Promise<CompanyEntity> {
        await this.findById(id);

        const deleteCompany = await prisma.empresas.delete({
            where: { id }
        });

        return CompanyEntity.fromObject( deleteCompany );
    }

}

