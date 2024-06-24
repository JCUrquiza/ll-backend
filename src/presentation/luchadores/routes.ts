import { Router } from 'express';
import { LuchadoresController } from './controller';


export class LuchadoresRoutes {

    static get routes(): Router {

        const router = Router();
        const luchadoresController = new LuchadoresController();

        router.post('/create', luchadoresController.createLuchador);
        router.get('/list', luchadoresController.getLuchadores);

        router.post('/list/byRegion', luchadoresController.getLuchadoresByRegion);

        router.put('/edit/:id', luchadoresController.updateLuchador);
        router.delete('/delete/all', luchadoresController.deleteAllWrestlers);
        router.delete('/delete/:id', luchadoresController.deleteLuchador);

        return router;
    }

}

