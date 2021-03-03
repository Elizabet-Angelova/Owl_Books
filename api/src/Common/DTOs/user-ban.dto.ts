import { IsNumber, IsPositive, IsNotEmpty } from 'class-validator';

export class UserBanDTO {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  period: number;
}