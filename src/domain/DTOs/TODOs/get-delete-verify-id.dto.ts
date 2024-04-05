

export class TodoGetAndDeleteDto {

    private constructor(
        public readonly id: number
    ){}

    static verify ( id:number ): [string?,TodoGetAndDeleteDto?] {
 
        if(isNaN(id)) return['Id is not a number']
        
        return [undefined, new TodoGetAndDeleteDto(id)]
    }
}

