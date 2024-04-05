

export class TodoUpdateDto {

    private constructor(
        public readonly id: number,
        public readonly text: string,
        public readonly completedAt: Date | null,
        public readonly isFinished: boolean
    ){}

    static update ( objectDto:{[key:string]:any} ): [string?,TodoUpdateDto?] {
 
        const {text,id,completedAt} = objectDto;

        let isFinished: boolean = false;

        if(isNaN(id)) return['Id is not a number']
        if(text === '' ) return ['You cannot sent empty text']

        let uptadeCompletedAt
        (completedAt === 'null' || `${new Date(completedAt)}` === 'Invalid Date')
        ? uptadeCompletedAt = null
        : uptadeCompletedAt = new Date(completedAt)

        if (uptadeCompletedAt) isFinished= true; 

        
        return [undefined, new TodoUpdateDto(id,text,uptadeCompletedAt,isFinished)]
    }
}

