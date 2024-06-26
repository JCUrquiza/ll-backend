import { Router } from 'express';
import { HistoryHairController } from './controller';


export class HistoryHairWinsRoutes {

    static get routes(): Router {

        const router = Router();
        const historyHairWins = new HistoryHairController();

        router.post('/create', historyHairWins.createRecordHairWins);
        router.get('/list', historyHairWins.getRecordHairWinsAll);
        router.put('/update/:id', historyHairWins.updateRecordHairWins);
        router.get('/detail/:id', historyHairWins.getDetailsOfRecord);
        router.delete('/delete/all', historyHairWins.deleteAllRecords);
        router.delete('/delete/:id', historyHairWins.deleteRecord);

        return router;
    }

}



