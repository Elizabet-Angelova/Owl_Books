import { IsString, IsNotEmpty } from "class-validator";

export class CreateReviewDTO {

    @IsString()
    @IsNotEmpty()
    content: string;
}