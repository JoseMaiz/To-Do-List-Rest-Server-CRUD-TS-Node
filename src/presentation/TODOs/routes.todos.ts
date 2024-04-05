import { Router } from 'express';
import { TodosControllers } from './controller.todos';
import { TodoService } from '../services/service.todos';




export class TodosRoutes {


  static get routes(): Router {

    const router = Router();

    const todoService = new TodoService()

    const controller = new TodosControllers(todoService);
    
    // *All routes
    router.post('/', controller.createTodo);
    router.get('/', controller.getAllTodos );
    router.get('/:id', controller.getTodo );
    router.put('/:id', controller.updateTodo );
    router.delete('/:id', controller.deleteTodo );



    return router;
  }


}

