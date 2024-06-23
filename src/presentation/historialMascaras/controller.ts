import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';


export class HistoryMascarasController {

    constructor() {}

    public createMaskWins = async(req: Request, res: Response) => {

        try {

            const { idWrestlerWins, idWrestlerLoser, dateFight } = req.body;

            const idWrestlerW = +idWrestlerWins;
            const idWrestlerL = +idWrestlerLoser;

            if ( !idWrestlerWins ) return res.status(400).json({ error: 'idWrestlerWins is required' });
            if ( !idWrestlerLoser ) return res.status(400).json({ error: 'idWrestlerLoser is required' });
            
            const wrestlerWins = await prisma.luchadores.findUnique({
                where: { id: idWrestlerW }
            });
            if ( !wrestlerWins ) return res.status(404). json({ error: 'Wrestler wins not found' });
            
            const wrestlerLoser = await prisma.luchadores.findUnique({
                where: { id: idWrestlerL }
            });
            if ( !wrestlerLoser ) return res.status(404). json({ error: 'Wrestler loser not found' });


            // Validar fecha en DTO*
            if ( !dateFight ) return res.status(400).json({ error: 'dateFight is required' });
            const fightDate = new Date(dateFight);
            if (isNaN(fightDate.getTime())) {
                return res.status(400).json({ error: 'dateFight must be a valid Date' });
            }

            // Verificar que esa lucha no haya sido registrada antes
            const historyMaskCreated = await prisma.historialMascarasGanadas.findFirst({
                where: {
                    luchadorGanadorId: wrestlerWins.id,
                    luchadorVencidoId: wrestlerLoser.id,
                    fechaLucha: fightDate.toISOString()
                }
            });
            if ( historyMaskCreated ) return res.status(400).json({ error: 'Fight already created' });

            await prisma.historialMascarasGanadas.create({
                data: {
                    luchadorGanadorId: wrestlerWins.id,
                    luchadorVencidoId: wrestlerLoser.id,
                    fechaLucha: fightDate.toISOString()
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
