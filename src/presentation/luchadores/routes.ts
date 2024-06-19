import { Router } from 'express';
import { LuchadoresController } from './controller';


export class LuchadoresRoutes {

    static get routes(): Router {

        const router = Router();
        const luchadoresController = new LuchadoresController();

        router.post('/create', luchadoresController.createLuchador);
        router.get('/list', luchadoresController.getLuchadores);

        return router;
    }

}

