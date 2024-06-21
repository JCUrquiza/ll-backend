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

        return res.json({ luchadores });
    }


    public updateLuchador = async(req: Request, res: Response) => {

        try {
            const id = +req.params.id;
            if ( !id || isNaN(id) ) return res.status(400).json({ message: 'Id not valid' });

            const luchador = await prisma.luchadores.findUnique({
                where: { id }
            });
            if ( !luchador ) return res.status(400).json({ message: `Wrestler with id ${ id } not exist` });

            const { nombre, estilo, peso, altura, ciudadNacimiento, aniosLuchador, genero, debut } = req.body;
            const wrestlerUpdated = await prisma.luchadores.update({
                where: { id },
                data: { nombre, estilo, peso, altura, ciudadNacimiento, aniosLuchador, genero, debut }
            });

            return res.json( wrestlerUpdated );

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }


    public deleteLuchador = async(req: Request, res: Response) => {

        try {
            const id = +req.params.id;
            if ( !id || isNaN(id) ) return res.status(400).json({ message: 'Id not valid' });

            await prisma.luchadores.delete({
                where: { id }
            });

            return res.json({ messaje: 'Wrestler successfully deleted' });
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ message: error.meta.cause });
        }        

    }

}

