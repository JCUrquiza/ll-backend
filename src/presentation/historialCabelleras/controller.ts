import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateHistoryHairDto, UpdateHistoryHairDto } from '../../domain';


export class HistoryHairController {

    constructor() {}

    public createRecordHairWins = async(req: Request, res: Response) => {

        try {

            const [error, createHistoryDto] = CreateHistoryHairDto.create( req.body );
            if ( error ) return res.status(400).json({ error });

            const wrestlerWins = await prisma.luchadores.findUnique({
                where: {
                    id: createHistoryDto!.luchadorGanadorId
                }
            });
            if ( !wrestlerWins ) return res.status(400).json({ error: 'Wrestler wins doesn´t exist' });
            const wrestlerLoser = await prisma.luchadores.findUnique({
                where: {
                    id: createHistoryDto!.luchadorVencidoId
                }
            });
            if ( !wrestlerLoser ) return res.status(400).json({ error: 'Wrestler loser doesn´t exist' });
            const recordSaved = await prisma.historialCabellerasGanadas.findFirst({
                where: createHistoryDto
            });
            if ( recordSaved ) return res.status(400).json({ error: 'Record previous saved' });

            const recordToSave = await prisma.historialCabellerasGanadas.create({
                data: createHistoryDto!
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

            const id = +req.params.id;
            const [error, updateHistoryHairDto] = UpdateHistoryHairDto.create({ ...req.body, id });
            if ( error ) return res.status(400).json({ error });

            const recordHair = await prisma.historialCabellerasGanadas.findUnique({
                where: {
                    id: updateHistoryHairDto!.id
                }
            });
            if ( !recordHair ) return res.status(400).json({ error: 'Record not found' });
            const wrestlerWins = await prisma.luchadores.findUnique({
                where: {
                    id: updateHistoryHairDto!.luchadorGanadorId
                }
            });
            if ( !wrestlerWins ) return res.status(400).json({ error: 'Wrestler wins doesn´t exist' });
            const wrestlerLoser = await prisma.luchadores.findUnique({
                where: {
                    id: updateHistoryHairDto!.luchadorVencidoId
                }
            });
            if ( !wrestlerLoser ) return res.status(400).json({ error: 'Wrestler loser doesn´t exist' });

            const recordUpdate = await prisma.historialCabellerasGanadas.update({
                where: { id: updateHistoryHairDto!.id },
                data: updateHistoryHairDto!.values
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


    public deleteRecord = async(req: Request, res: Response) => {

        try {
            
            const idRecord = +req.params.id;
            if ( isNaN(idRecord) ) return res.status(400).json({ error: `ID argument is not a number` });

            const deleteRecord = await prisma.historialCabellerasGanadas.delete({
                where: {
                    id: idRecord
                }
            });
            if ( !deleteRecord ) return res.status(500).json({ error: 'Something was wrong' });


            return res.json({ message: 'Record deleted successfully' });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }


    public deleteAllRecords = async(req: Request, res: Response) => {

        try {

            const allRecords = await prisma.historialCabellerasGanadas.deleteMany();

            if ( !allRecords ) return res.status(400).json({ error: 'Something was happend' });

            return res.json({ message: 'All records deleted successfully' });
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }

    }

}



