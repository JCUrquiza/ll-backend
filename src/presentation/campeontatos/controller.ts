import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateChampionshipDto, UpdateChampionshipDto } from '../../domain';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';


export class ChampionshipController {

    constructor() {}

    public createChampionship = async(req: Request, res: Response) => {

        const { nombre } = req.body;
        const [error, createChampionshipDto] = CreateChampionshipDto.create(req.body);
        if ( error ) return res.status(400).json({ error });

        const championshipExist = await prisma.campeonatos.findFirst({
            where: {
                nombre
            }
        });
        if ( championshipExist ) return res.status(400).json('Este campeonato ya existe');

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
        const [error, updateChampionshipDto] = UpdateChampionshipDto.create({...req.body, id});
        if ( error) res.status(400).json({ error });
        
        const champion = await prisma.campeonatos.findFirst({
            where: { id }
        });
        if ( !champion ) return res.status(404).json({ error: 'Champion with that Id not found' });

        const updatedChampion = await prisma.campeonatos.update({
            where: { id },
            data: updateChampionshipDto!.values
        });

        res.json( updatedChampion );
    }


    public deleteChampionship = async(req: Request, res: Response) => {

        try {
            const id = +req.params.id;
            if ( !id || isNaN(id) ) return res.status(404).json({ error: 'Id not valid' });

            await prisma.campeonatos.delete({
                where: { id }
            });
            
            return res.json({ message: 'Championship successfully deleted' });
        } catch (error) {
            if ( (error as PrismaClientKnownRequestError).code === 'P2025' ) {
                return res.status(400).json({ error: 'Championship not found' });
            }
            
            return res.status(500).json({ error: 'Contacte al administrador' });
        }

    }


}


