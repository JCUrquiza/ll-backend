import { Router } from 'express';
import { LuchadoresRoutes } from './luchadores/routes';

export class AppRouter {

    static get routes(): Router {

        const router = Router();

        router.use('/api/luchadores', LuchadoresRoutes.routes );

        return router;
    }

}


