import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateHistoryMaskDto, UpdateHistoryMaskDto } from '../../domain';


export class HistoryMascarasController {

    constructor() {}

    public createRecordMaskWins = async(req: Request, res: Response) => {

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

            return res.json({ message: 'Fight history mask created successfully' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }


    public recordMaskDetails = async(req: Request, res: Response) => {

        try {
            
            const idFightWins = +req.params.id;

            const historyMaskWinsByWrestler = await prisma.historialMascarasGanadas.findMany({
                where: { id: idFightWins },
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

    
    public updateRecordMask = async(req: Request, res: Response) => {

        const idRecord = +req.params.id;
        const [error, updateHistoryMaskDto] = UpdateHistoryMaskDto.create( req.body );
        if ( error ) return res.status(400).json({ error });

        const record = await prisma.historialMascarasGanadas.findUnique({
            where: { id: idRecord }
        });
        if ( !record  ) return res.status(404).json({ error: 'Record not found' });

        // Verify id´s wrestler wins and lose exist
        const wrestlerWinsExist = await prisma.luchadores.findUnique({
            where: { id: updateHistoryMaskDto?.luchadorGanadorId }
        });
        if ( !wrestlerWinsExist ) return res.status(404).json({ error: 'Wrestler wins doesn´t exist' });
        const wrestlerLoserExist = await prisma.luchadores.findUnique({
            where: { id: updateHistoryMaskDto?.luchadorVencidoId }
        });
        if ( !wrestlerLoserExist ) return res.status(404).json({ error: 'Wrestler loser doesn´t exist' });

        const historyUpdated = await prisma.historialMascarasGanadas.update({
            where: { id: idRecord },
            data: updateHistoryMaskDto!.values
        });

        return res.json( historyUpdated );
    }


    public allRecordsMaskWins = async(req: Request, res: Response) => {

        try {
            const records = await prisma.historialMascarasGanadas.findMany({
                include: {
                    luchadorGanador: true
                }
            });
            if ( records.length === 0 ) return res.status(404).json({ error: 'Not records found' });

            const luchadoresVencidosPromise = records.map( record => {
                return prisma.luchadores.findUnique({
                    where: { id: record.luchadorVencidoId }
                });
            });

            const luchadoresVencidos = await Promise.all( luchadoresVencidosPromise );

            const result = records.map((record, index) => ({
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


    public deleteRecordMaskWins = async(req: Request, res: Response) => {

        try {
            const idRecord = +req.params.id;

            await prisma.historialMascarasGanadas.delete({
                where: { id: idRecord }
            });
            
            return res.json({ message: 'Record deleted successfully!!' });
        } catch (error: any) {
            console.log(error);
            if ( error.code === 'P2025') {
                return res.status(404).json({ error: error.meta.cause });
            }
            return res.status(500).json({ error });
        }

    }


    public deleteAllRecords = async(req: Request, res: Response) => {

        try {
            await prisma.historialMascarasGanadas.deleteMany();
            return res.json({ message: 'All records was deleted successfully' });            
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

}
