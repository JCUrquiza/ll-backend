import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateCompany, CreateCompanyDto, GetCompanies, GetCompany, UpdateCompany, UpdateCompanyDto } from '../../domain';
import { CompanyRepository } from '../../domain/repositories/company.repository';


export class EmpresasController {
    
    constructor(
        private readonly companyRepository: CompanyRepository
    ) {}

    public createCompany = async(req: Request, res: Response) => {
        const [error, createCompanyDto] = CreateCompanyDto.create(req.body);
        if ( error ) return res.status(400).json({ error });

        new CreateCompany( this.companyRepository )
            .execute(createCompanyDto!)
            .then( company => res.json(company) )
            .catch( error => res.status(400).json({ error }) )
    }


    public getCompanies = (req: Request, res: Response) => {
        new GetCompanies( this.companyRepository )
            .execute()
            .then( companies => res.json({ empresas: companies }) )
            .catch( error => res.status(400).json({ error }) )
    }


    public getCompany = (req: Request, res: Response) => {
        const id = +req.params.id;
        if ( isNaN(id) ) return res.status(400).json({ error: `ID argument is not a number` });

        new GetCompany( this.companyRepository )
            .execute(id)
            .then( company => res.json(company) )
            .catch( error => res.status(400).json({ error }) )
    }


    public updateCompany = async(req: Request, res: Response) => {
        const id = +req.params.id;
        if ( !id || isNaN(id) ) return res.status(404).json({ error: 'Missing ID' });

        const [error, updateCompany] = UpdateCompanyDto.create({...req.body, id});
        if ( error ) return res.status(400).json({ error });

        new UpdateCompany( this.companyRepository )
            .execute( updateCompany! )
            .then( company => res.json( company ) )
            .catch( error => res.status(400).json({ error }) )
    }


    public deleteCompany = async(req: Request, res: Response) => {
        try {
            const id = +req.params.id
            if ( !id || isNaN(id) ) return res.status(404).json({ error: 'Missing ID' });
    
            await prisma.empresas.delete({
                where: { id }
            });
    
            return res.json({ message: 'Company successfully deleted' });
        } catch (error: any) {
            if (error.code === 'P2025') {
                // Este código de error es específico de Prisma cuando no se encuentra un registro para eliminar
                return res.status(404).json({ error: 'Company not found' });
            }
            // Responde con un error genérico en caso de cualquier otro problema
            return res.status(500).json({ error: 'An error occurred while deleting the company' });
        }
    }


}

