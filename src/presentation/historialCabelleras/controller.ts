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

            return res.status(201).json({ recordToSave });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }


    public getRecordHairWinsAll = async(req: Request, res: Response) => {

        try {

            const allRecordsHair = await prisma.historialCabellerasGanadas.findMany({
                include: {
                    luchadorGanador: true
                }
            });

            if ( allRecordsHair.length === 0 ) return res.status(404).json({ error: 'Not records found' });

            const luchadoresVencidosPromise = allRecordsHair.map( record => {
                return prisma.luchadores.findUnique({
                    where: { id: record.luchadorVencidoId }
                });
            });

            const luchadoresVencidos = await Promise.all( luchadoresVencidosPromise );

            const result = allRecordsHair.map((record, index) => ({
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


    public updateRecordHairWins = async(req: Request, res: Response) => {

        try {

            const idRecord = +req.params.id;
            if ( isNaN(idRecord) ) return res.status(400).json({ error: `ID argument is not a number` });

            const recordHair = await prisma.historialCabellerasGanadas.findUnique({
                where: {
                    id: idRecord
                }
            });
            if ( !recordHair ) return res.status(400).json({ error: 'Record not found' });

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

            const recordUpdate = await prisma.historialCabellerasGanadas.update({
                where: { id: idRecord },
                data: {
                    luchadorGanadorId: wrestlerWins.id,
                    luchadorVencidoId: wrestlerLoser.id,
                    fechaLucha: newFechaLucha
                }
            });

            return res.json(recordUpdate);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }


    public getDetailsOfRecord = async(req: Request, res: Response) => {

        try {

            const idRecord = +req.params.id;
            if ( isNaN(idRecord) ) return res.status(400).json({ error: `ID argument is not a number` });

            const recordDetails = await prisma.historialCabellerasGanadas.findUnique({
                where: { id: idRecord },
                include: {
                    luchadorGanador: true
                }
            });
            if ( !recordDetails ) return res.status(400).json({ error: 'Record not found' });

            const detailsOfWrestlerLoser = await prisma.luchadores.findUnique({
                where: { id: recordDetails.luchadorVencidoId }
            });

            const result = {
                id: recordDetails.id,
                fechaLucha: recordDetails.fechaLucha,
                luchadorGanador: recordDetails.luchadorGanador,
                luchadorVencido: detailsOfWrestlerLoser
            }

            return res.json( result );
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

}



