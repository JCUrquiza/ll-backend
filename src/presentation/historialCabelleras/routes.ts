import { Router } from 'express';
import { HistoryHairController } from './controller';


export class HistoryHairWinsRoutes {

    static get routes(): Router {

        const router = Router();
        const historyHairWins = new HistoryHairController();

        router.post('/create', historyHairWins.createRecordHairWins);
        router.get('/list', historyHairWins.getRecordHairWinsAll);
        router.put('/update/:id', historyHairWins.updateRecordHairWins);

        return router;
    }

}



