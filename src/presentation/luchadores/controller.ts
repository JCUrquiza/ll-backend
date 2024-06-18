import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';


export class LuchadoresController {

    constructor() {}

    public createLuchador = async(req: Request, res: Response) => {

        const { nombre, estilo, genero } = req.body;

        const empresa = await prisma.empresas.findFirst();
        if ( !empresa ) return res.status(404).json({ error: 'Company not found' }); 

        const luchador = await prisma.luchadores.create({
            data: {
                nombre,
                estilo,
                genero,
                empresa: {
                    connect: {
                        id: empresa.id
                    }
                }
            }
        });
        
        return res.json( luchador );
    }

    public getLuchadores = (req: Request, res: Response) => {

        res.json([
            { id: 1, nombre: 'Último Guerrero', estilo: 'rudo' },
            { id: 2, nombre: 'Místico', estilo: 'técnico' },
            { id: 3, nombre: 'Atlantis', estilo: 'técnico' },
        ])

    }

}

