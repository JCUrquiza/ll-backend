import { Router } from 'express';
import { EmpresasController } from './controller';
import { CompanyDatasourceImpl } from '../../infrastructure/datasource/company.datasource.impl';
import { CompanyRepositoryImpl } from '../../infrastructure/repositories/company.repository.impl';


export class EmpresasRoutes {

    static get routes(): Router {

        const router = Router();

        // Clean Architecture:
        const datasource = new CompanyDatasourceImpl();
        const companyRepository = new CompanyRepositoryImpl( datasource );

        const empresasController = new EmpresasController( companyRepository );

        router.post('/create', empresasController.createCompany);
        router.get('/list', empresasController.getCompanies);
        router.put('/update/:id', empresasController.updateCompany);
        router.delete('/delete/:id', empresasController.deleteCompany);

        return router;
    }

}

