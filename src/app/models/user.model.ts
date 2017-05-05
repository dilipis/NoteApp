export class UserModel{
    constructor(public emailID:string,
                public password:string,
                public firstName?:string,
                public lastName?:string
            ){}
}