import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateHistoryMaskDto } from '../../domain';


export class HistoryMascarasController {

    constructor() {}

    public createMaskWins = async(req: Request, res: Response) => {

        try {

            const [error, createHistoryMaskDto] = CreateHistoryMaskDto.create( req.body );
            if ( error ) return res.status(400).json({ error });

            const wrestlerWins = await prisma.luchadores.findUnique({
                where: { id: createHistoryMaskDto?.idWrestlerWins }
            });
            if ( !wrestlerWins ) return res.status(404). json({ error: 'Wrestler wins not found' });            
            const wrestlerLoser = await prisma.luchadores.findUnique({
                where: { id: createHistoryMaskDto?.idWrestlerLoser }
            });
            if ( !wrestlerLoser ) return res.status(404). json({ error: 'Wrestler loser not found' });

            // Verificar que esa lucha no haya sido registrada antes
            const historyMaskCreated = await prisma.historialMascarasGanadas.findFirst({
                where: {
                    luchadorGanadorId: createHistoryMaskDto?.idWrestlerWins,
                    luchadorVencidoId: createHistoryMaskDto?.idWrestlerLoser,
                    fechaLucha: createHistoryMaskDto?.dateFight
                }
            });
            if ( historyMaskCreated ) return res.status(400).json({ error: 'Fight already created' });

            await prisma.historialMascarasGanadas.create({
                data: {
                    luchadorGanadorId: createHistoryMaskDto!.idWrestlerWins,
                    luchadorVencidoId: createHistoryMaskDto!.idWrestlerLoser,
                    fechaLucha: createHistoryMaskDto!.dateFight
                }
            });

            return res.json({ message: 'Fight history created successfully' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }


    public historyFightMaskDetails = async(req: Request, res: Response) => {

        try {
            
            const idWrestlerWins = +req.params.id;

            const historyMaskWinsByWrestler = await prisma.historialMascarasGanadas.findMany({
                where: { luchadorGanadorId: idWrestlerWins },
                include: {
                    luchadorGanador: true
                }
            });
            if ( historyMaskWinsByWrestler.length === 0 ) return res.status(404).json({ message: 'No record found' });
            
            const luchadoresVencidosPromise = historyMaskWinsByWrestler.map( record => {
                return prisma.luchadores.findUnique({
                    where: { id: record.luchadorVencidoId }
                });
            });

            const luchadoresVencidos = await Promise.all( luchadoresVencidosPromise );

            const result = historyMaskWinsByWrestler.map((record, index) => ({
                id: record.id,
                fechaLucha: record.fechaLucha,
                luchadorGanador: record.luchadorGanador,
                luchadorVencido: luchadoresVencidos[index]
            }));

            return res.json( result );
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

}
