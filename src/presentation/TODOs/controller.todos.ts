import { Request, Response } from "express";
import { TodoService } from "../services/service.todos";
import { CustomError, TodoCreateDto, TodoGetAndDeleteDto, TodoUpdateDto } from "../../domain";


export class TodosControllers {

    constructor(
        public readonly todoService:TodoService
    ){}

    private handleErrror (error:unknown, res:Response) {
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error:error.message});
        }

        console.error(`${error}`);
        return res.status(500).json({error:'Internal Server error'})
    }


    createTodo = (req:Request, res:Response)=>{

        const [error,todoCreateDto] = TodoCreateDto.Create(req.body);

        if(error) return res.status(400).json({error});

        this.todoService.createTodo(todoCreateDto!)
            .then((todoCreated)=> res.json(todoCreated))
            .catch(error => this.handleErrror(error,res));


    }

    getAllTodos = (req:Request, res:Response)=>{

        this.todoService.getAllTodos()
            .then((todos)=> res.json(todos))
            .catch(error => this.handleErrror(error,res));
    }

    getTodo = (req:Request, res:Response)=>{

        const id = + req.params.id
        const [error,todoGetAndDeleteDto] = TodoGetAndDeleteDto.verify(id);
        
        if(error) return res.status(400).json({error});

        this.todoService.getTodo(todoGetAndDeleteDto!)
            .then((todo)=> res.json(todo))
            .catch((error)=> this.handleErrror(error,res));

    }

    updateTodo = (req:Request, res:Response)=>{

        const id = + req.params.id;

        const [error,todoUpdateDto] = TodoUpdateDto.update({...req.body,id});

        if(error) return res.status(400).json({error});

        this.todoService.updateTodo(todoUpdateDto!)
            .then((todo)=> res.json(todo))
            .catch((error)=> this.handleErrror(error,res));

    }

    deleteTodo = (req:Request, res:Response)=>{

        const id = + req.params.id;

        const [error,todoGetAndDeleteDto] = TodoGetAndDeleteDto.verify(id);

        if(error) return res.status(400).json({error});

        this.todoService.DeleteTodo(todoGetAndDeleteDto!)
            .then((todo)=> res.json(todo))
            .catch((error)=> this.handleErrror(error,res));
    
    }

}

