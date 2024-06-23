import { Router } from 'express';
import { LuchadoresRoutes } from './luchadores/routes';
import { EmpresasRoutes } from './empresas/routes';
import { ChampionshipRoutes } from './campeontatos/routes';
import { HistoryMaskWinsRoutes } from './historialMascaras/routes';

export class AppRouter {

    static get routes(): Router {

        const router = Router();

        router.use('/api/empresas', EmpresasRoutes.routes );
        router.use('/api/luchadores', LuchadoresRoutes.routes );
        router.use('/api/campeonatos', ChampionshipRoutes.routes );
        router.use('/api/history/mask', HistoryMaskWinsRoutes.routes );

        return router;
    }

}


