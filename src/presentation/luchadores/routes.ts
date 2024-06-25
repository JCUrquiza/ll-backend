import { Router } from 'express';
import { LuchadoresController } from './controller';
import { WrestlerDatasourceImpl } from '../../infrastructure/datasource/wrestler.datasource.impl';
import { WrestlerRepositoryImpl } from '../../infrastructure/repositories/wrestler.repository.impl';


export class LuchadoresRoutes {

    static get routes(): Router {

        const router = Router();

        // Clean Architecture:
        const datasource = new WrestlerDatasourceImpl();
        const wrestlerRepository = new WrestlerRepositoryImpl( datasource );

        const luchadoresController = new LuchadoresController( wrestlerRepository );

        router.post('/create', luchadoresController.createLuchador);
        router.get('/list', luchadoresController.getLuchadores);
        router.post('/list/byParameters', luchadoresController.getLuchadoresByParameters);
        router.put('/edit/:id', luchadoresController.updateLuchador);
        router.delete('/delete/all', luchadoresController.deleteAllWrestlers);
        router.delete('/delete/:id', luchadoresController.deleteLuchador);

        return router;
    }

}

