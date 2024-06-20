import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateChampionshipDto } from '../../domain';


export class ChampionshipController {

    constructor() {}

    public createChampionship = async(req: Request, res: Response) => {

        // const { nombre, rangoPeso, anioFundacion } = req.body;
        const [error, createChampionshipDto] = CreateChampionshipDto.create(req.body);
        if ( error ) return res.status(400).json({ error });

        // const championshipExist = await prisma.campeonatos.findFirst({
        //     where: {
        //         nombre
        //     }
        // });
        // if ( championshipExist ) return res.status(400).json('Este campeonato ya existe');


        const championship = await prisma.campeonatos.create({
            data: createChampionshipDto!
        });

        return res.json( championship );
    }

    public getChampionships = async(req: Request, res: Response) => {

        const championships = await prisma.campeonatos.findMany();
        if ( championships.length === 0 ) return res.status(400).json('No hay campeonatos guardados');

        return res.json({ championships })
    }

    public updateChampionship = async(req: Request, res: Response) => {

        const id = +req.params.id;
        if ( isNaN(id) ) return res.status(400).json({ error: 'ID argument is not a number' });

        const champion = await prisma.campeonatos.findFirst({
            where: { id }
        });
        if ( !champion ) return res.status(404).json({ error: 'Champion with that Id not found' });

        const { nombre, rangoPeso, anioFundacion } = req.body;

        const updatedChampion = await prisma.campeonatos.update({
            where: { id },
            data: { nombre, rangoPeso, anioFundacion }
        });

        res.json( updatedChampion );
    }

}


