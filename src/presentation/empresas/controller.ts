import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';


export class EmpresasController {
    

    constructor() {}


    public createCompany = async(req: Request, res: Response) => {

        const { nombre, abreviatura } = req.body;
        if ( !nombre ) return res.status(404).json('No permitido, es necesario indicar el nombre');
        if ( !abreviatura ) return res.status(404).json('No permitido, es necesario indicar la abreviatura');

        const empresaExistente = await prisma.empresas.findFirst({
            where: {
                abreviatura
            }
        });
        if ( empresaExistente ) return res.status(400).json(`Empresa ${ abreviatura } ya existe`);

        const empresa = await prisma.empresas.create({
            data: { nombre, abreviatura }
        });

        return res.status(201).json({ empresa });
    }


    public getCompanies = async(req: Request, res: Response) => {
        const companies = await prisma.empresas.findMany();
        res.json({ empresas: companies });
    }


}

