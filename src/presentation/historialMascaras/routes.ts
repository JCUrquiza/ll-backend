import { Router } from 'express';
import { HistoryMascarasController } from './controller';


export class HistoryMaskWinsRoutes {

    static get routes(): Router {

        const router = Router();
        const historyMaskWins = new HistoryMascarasController();

        router.post('/create', historyMaskWins.createMaskWins);
        router.get('/details/:id', historyMaskWins.historyFightMaskDetails);

        return router;
    }

}
