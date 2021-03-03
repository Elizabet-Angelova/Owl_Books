import { MinLength, IsNotEmpty, IsString, IsNumber} from "class-validator";

export class CreateUserDTO {
    @IsString()
    @IsNotEmpty( {
        message: "Your username cannot be empty!"
    })
    public username: string;

    @IsString()
    @IsNotEmpty( {
        message: "Your display name cannot be empty!"
    })
    public displayName: string;

    @IsString()
    @IsNotEmpty( {
        message: "Password cannot be empty!"
    })
    @MinLength(5, {
        message: "Password is  too short, it must be atleast 5 symbols!"
    }) //min length
    public password: string;

    
    role? : string;
}