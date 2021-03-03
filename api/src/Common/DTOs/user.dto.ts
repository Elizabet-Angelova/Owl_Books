import { BookDTO } from "./book.dto";
import { ReviewDTO } from "./review.dto";
import { Review } from "src/Models/review.entity";
import { Book } from "src/Models/book.entity";
import { Vote } from "src/Models/vote.entity";
import { IsNumber, IsNotEmpty, IsString } from "class-validator";

export class UserDTO {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    displayName: string;

    avatar?: string ;

    banEndDate: Date | string;

    borrowedBooks: BookDTO[];

    reviews: ReviewDTO[]; 

    votes: Vote[]; 
}
