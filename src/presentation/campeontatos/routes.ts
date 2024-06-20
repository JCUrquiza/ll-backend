import { Router } from 'express';
import { ChampionshipController } from './controller';


export class ChampionshipRoutes {

    static get routes(): Router {

        const router = Router();
        const championshipController = new ChampionshipController();

        router.post('/create', championshipController.createChampionship);
        router.get('/list', championshipController.getChampionships);
        router.put('/update', championshipController.updateChampionship);

        return router;
    }

}

