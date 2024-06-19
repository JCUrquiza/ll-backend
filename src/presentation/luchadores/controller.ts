import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';


export class LuchadoresController {

    constructor() {}

    public createLuchador = async(req: Request, res: Response) => {

        const { nombre, estilo, genero, empresa } = req.body;
        if ( !nombre ) return res.status(404).json('No permitido, es necesario indicar el nombre');
        if ( !estilo ) return res.status(404).json('No permitido, es necesario indicar el estilo');
        if ( !genero ) return res.status(404).json('No permitido, es necesario indicar el genero');
        if ( !empresa ) return res.status(404).json('No permitido, es necesario indicar la empresa');

        const empresaBusqueda = await prisma.empresas.findFirst({
            where: {
                abreviatura: empresa
            }
        });
        if ( !empresaBusqueda ) return res.status(404).json({ error: 'Company not found' }); 

        const luchador = await prisma.luchadores.create({
            data: {
                nombre,
                estilo,
                genero,
                empresa: {
                    connect: {
                        id: empresaBusqueda.id
                    }
                }
            }
        });
        
        return res.json( luchador );
    }

    public getLuchadores = async(req: Request, res: Response) => {
        const luchadores = await prisma.luchadores.findMany();
        if ( luchadores.length === 0 ) return res.status(404).json('No hay luchadores que mostrar');

        res.json({ luchadores });
    }

}

