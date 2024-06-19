import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';


export class ChampionshipController {

    constructor() {}

    public createChampionship = async(req: Request, res: Response) => {

        const { nombre, rangoPeso, anioFundacion } = req.body;
        if ( !nombre ) return res.status(404).json('Name is missed');
        if ( !rangoPeso ) return res.status(404).json('Name is rangoPeso');

        const championshipExist = await prisma.campeonatos.findFirst({
            where: {
                nombre
            }
        });
        if ( championshipExist ) return res.status(400).json('Este campeonato ya existe');

        const championship = await prisma.campeonatos.create({
            data: {
                nombre: nombre,
                rangoPeso: rangoPeso,
                anioFundacion: anioFundacion
            }
        });

        return res.json( championship );
    }

    public getChampionships = async(req: Request, res: Response) => {

        const championships = await prisma.campeonatos.findMany();
        if ( championships.length === 0 ) return res.status(400).json('No hay campeonatos guardados');

        return res.json({ championships })
    }

}


