import { Router } from 'express';
import { EmpresasController } from './controller';


export class EmpresasRoutes {

    static get routes(): Router {

        const router = Router();
        const empresasController = new EmpresasController();

        router.post('/create', empresasController.createCompany);
        router.get('/list', empresasController.getCompanies);

        return router;
    }

}

