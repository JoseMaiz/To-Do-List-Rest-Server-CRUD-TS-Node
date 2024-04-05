import { CustomError } from "../errors/custom-error";


export class TodoEntity {

    constructor(
        public id:number,
        public text:string,
        public completedAt?: Date|null,
        public isFinished?: boolean,
    ){}

    static fromObject(object:{[key:string]:any}){

        const {text,id,completedAt,isFinished,} = object;

        if(!text) throw CustomError.badRequest('Missing text');
        if(!id) throw CustomError.badRequest('Missing id');

        if(isFinished || isFinished === null ){
            if(!(typeof isFinished === 'boolean') ) throw CustomError.badRequest('isFinished is not a valid date');
        }

        let newCompletedAt;
        if (completedAt){
            newCompletedAt = new Date(completedAt);

            if (isNaN(newCompletedAt.getTime())) {
                throw CustomError.badRequest('CompletedAt is not a valid date')
            }

        };


        return new TodoEntity(id,text,completedAt,isFinished);

    }


}

