import { UserDTO } from "./user.dto";
import { ReviewDTO } from "./review.dto";
import { IsNumber, IsNotEmpty, IsString } from "class-validator";

export class BookDTO {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  description: string;
  img: string;
  borrowedBy: UserDTO;
  reviews: ReviewDTO[];
}