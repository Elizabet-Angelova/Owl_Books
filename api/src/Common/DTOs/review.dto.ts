import { Vote } from "src/Models/vote.entity";
import { UserDTO } from "./user.dto";
import { IsNumber, IsNotEmpty, IsString } from "class-validator";

export class ReviewDTO {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsNotEmpty()
    authorUsername: string;

    author: UserDTO;
    
    votes: Vote[];
}