import { IsNull } from "typeorm";
import { IsNumber } from "class-validator";

export class VoteDTO {
    @IsNumber()
    reaction: -1 | 1;
}