

export class TodoCreateDto {

    private constructor(
        public readonly text:string
    ){}

    static Create(objectDto: {[key:string]:any}): [string?,TodoCreateDto?]{

        const {text} = objectDto;

        if(!text || text === '' ) return ['Missing text']

        return [undefined, new TodoCreateDto(text)];
    }

}

