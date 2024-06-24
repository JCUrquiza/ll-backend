import { Router } from 'express';
import { HistoryMascarasController } from './controller';


export class HistoryMaskWinsRoutes {

    static get routes(): Router {

        const router = Router();
        const historyMaskWins = new HistoryMascarasController();

        router.post('/create', historyMaskWins.createRecordMaskWins);
        router.get('/details/:id', historyMaskWins.recordMaskDetails);
        router.put('/update/:id', historyMaskWins.updateRecordMask);
        router.get('/list', historyMaskWins.allRecordsMaskWins);
        router.delete('/delete/all', historyMaskWins.deleteAllRecords);
        router.delete('/delete/:id', historyMaskWins.deleteRecordMaskWins);

        return router;
    }

}
