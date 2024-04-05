import { prisma } from '../../data/postgresSQL';
import { CustomError, TodoCreateDto, TodoGetAndDeleteDto, TodoUpdateDto } from '../../domain';
import { TodoEntity } from '../../domain/entities';


export class TodoService{

    constructor(){}

    public async createTodo(todoCreateDto:TodoCreateDto){

        try {            
            const todo = await prisma.todo.create({
                data: todoCreateDto
            })
    
            const todoEntity = TodoEntity.fromObject({id: todo.id, text:todo.text,});
    
            return {
                todo:todoEntity,
            }

        } catch (error) {
            console.error({error});
            throw CustomError.internalServer(`Internal Servel Error`)
        }
    }

    public async getAllTodos(){

        try {
            
            const todos = await prisma.todo.findMany();

            const todoEntity = todos.map((todo)=>TodoEntity.fromObject(todo));

            return todoEntity;
        } catch (error) {
            console.error({error});
            throw CustomError.internalServer(`Internal Servel Error`)
        }
    }

    public async getTodo (getAndDeleteDto:TodoGetAndDeleteDto){

        try {
            const todo = await prisma.todo.findFirst({
                where:{id:getAndDeleteDto.id}
            })

            if(!todo) throw CustomError.notFound(`Element with id ${getAndDeleteDto.id} not exist`);

            const todoEntity = TodoEntity.fromObject(todo)
            return {todo:todoEntity,}
            
        } catch (error) {

            throw error

        }
    }

    public async updateTodo(todoUpdateDto:TodoUpdateDto){

        await this.getTodo(todoUpdateDto);

        try {
            
            const todo = await prisma.todo.update({
                where:{id:todoUpdateDto.id},
                data:{...todoUpdateDto}
            });

            const todoUpdatedEntity = TodoEntity.fromObject(todo);

            return{
                todo:todoUpdatedEntity,
            }

        } catch (error) {

            throw CustomError.internalServer('Internal Server Error');
        }

    }

    public async DeleteTodo(getAndDeleteDto:TodoGetAndDeleteDto){

        await this.getTodo(getAndDeleteDto);

        try {

            const todoDeleted = await prisma.todo.delete({
                where: {id:getAndDeleteDto.id}
            });

            const todoDeletedEntity = TodoEntity.fromObject(todoDeleted);

            return {
                todo:todoDeletedEntity,
            }

        } catch (error) {
            throw CustomError.internalServer('Internal Server Error')
        }

    }
}


