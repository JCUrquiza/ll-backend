import { Router } from 'express';
import { LuchadoresController } from './controller';


export class LuchadoresRoutes {

    static get routes(): Router {

        const router = Router();
        const luchadoresController = new LuchadoresController();

        router.get('/', luchadoresController.getLuchadores);

        return router;
    }

}

