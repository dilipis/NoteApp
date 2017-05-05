export class Note{
    constructor(public noteText:string, 
                public noteCreatorName?:string,
                public noteLink?:string,
                public noteTags?:string[],
                public noteID?:string,
                public noteCreatorID?:string){}
}