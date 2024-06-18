import { Router } from 'express';
import { LuchadoresRoutes } from './luchadores/routes';
import { EmpresasRoutes } from './empresas/routes';

export class AppRouter {

    static get routes(): Router {

        const router = Router();

        router.use('/api/empresas', EmpresasRoutes.routes );
        router.use('/api/luchadores', LuchadoresRoutes.routes );

        return router;
    }

}


