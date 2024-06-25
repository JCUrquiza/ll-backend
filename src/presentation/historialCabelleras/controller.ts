import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';


export class HistoryHairController {

    constructor() {}

    public createRecordHairWins = async(req: Request, res: Response) => {

        try {

            const { luchadorGanadorId, luchadorVencidoId, fechaLucha } = req.body;

            const wrestlerWins = await prisma.luchadores.findUnique({
                where: {
                    id: +luchadorGanadorId
                }
            });
            if ( !wrestlerWins ) return res.status(400).json({ error: 'Wrestler wins doesn´t exist' });

            const wrestlerLoser = await prisma.luchadores.findUnique({
                where: {
                    id: +luchadorVencidoId
                }
            });
            if ( !wrestlerLoser ) return res.status(400).json({ error: 'Wrestler loser doesn´t exist' });


            let newFechaLucha = fechaLucha;
            newFechaLucha = new Date(fechaLucha);
            if ( newFechaLucha.toString() === 'Invalid Date' ) {
                return res.status(400).json({ error: 'Invalid date' });
            }


            const recordSaved = await prisma.historialCabellerasGanadas.findFirst({
                where: {
                    luchadorGanadorId: wrestlerWins.id,
                    luchadorVencidoId: wrestlerLoser.id,
                    fechaLucha: newFechaLucha
                }
            });
            if ( recordSaved ) return res.status(400).json({ error: 'Record previous saved' });

            const recordToSave = await prisma.historialCabellerasGanadas.create({
                data: {
                    luchadorGanadorId: wrestlerWins.id,
                    luchadorVencidoId: wrestlerLoser.id,
                    fechaLucha: newFechaLucha
                }
            });

            return res.json({ recordToSave });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

}



