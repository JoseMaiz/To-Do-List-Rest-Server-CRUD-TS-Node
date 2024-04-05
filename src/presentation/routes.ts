import { Router } from 'express';
import { TodosRoutes } from './TODOs/routes.todos';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/todos', TodosRoutes.routes );



    return router;
  }


}

