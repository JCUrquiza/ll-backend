import { Router } from 'express';
import { ChampionshipController } from './controller';
import { ChampionshipDatasourceImpl } from '../../infrastructure/datasource/championship.datasource.impl';
import { ChampionshipRepositoryImpl } from '../../infrastructure/repositories/championship.repository.impl';


export class ChampionshipRoutes {

    static get routes(): Router {

        const router = Router();

        // Clean Architecture
        const datasource = new ChampionshipDatasourceImpl();
        const championshipRepository = new ChampionshipRepositoryImpl( datasource );

        const championshipController = new ChampionshipController( championshipRepository );

        router.post('/create', championshipController.createChampionship);
        router.get('/list', championshipController.getChampionships);
        router.put('/update', championshipController.updateChampionship);
        router.delete('/delete/:id', championshipController.deleteChampionship);

        return router;
    }

}

