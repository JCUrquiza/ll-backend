import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateCompanyDto, UpdateCompanyDto } from '../../domain';


export class EmpresasController {
    
    constructor() {}

    public createCompany = async(req: Request, res: Response) => {
        const { abreviatura } = req.body;

        const [error, createCompanyDto] = CreateCompanyDto.create(req.body);
        if ( error ) return res.status(400).json({ error });

        const empresaExistente = await prisma.empresas.findFirst({
            where: {
                abreviatura
            }
        });
        if ( empresaExistente ) return res.status(400).json(`Empresa ${ abreviatura } ya existe`);

        const empresa = await prisma.empresas.create({
            data: createCompanyDto!
        });

        return res.status(201).json({ empresa });
    }


    public getCompanies = async(req: Request, res: Response) => {
        const companies = await prisma.empresas.findMany();
        if ( companies.length === 0 ) return res.status(404).json('No hay empresas que mostrar');

        return res.json({ empresas: companies });
    }


    public updateCompany = async(req: Request, res: Response) => {
        const id = +req.params.id;
        if ( !id || isNaN(id) ) return res.status(404).json({ error: 'Missing ID' });

        const [error, updateCompany] = UpdateCompanyDto.create(req.body);
        if ( error ) return res.status(400).json({ error });

        const company = await prisma.empresas.findUnique({
            where: {
                id: id
            }
        });
        if ( !company ) return res.status(404).json({ error: `No existe empresa con el id: ${ id }` });

        const companyUpdate = await prisma.empresas.update({
            where: {
                id
            },
            data: updateCompany!
        });

        return res.json( companyUpdate );
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

