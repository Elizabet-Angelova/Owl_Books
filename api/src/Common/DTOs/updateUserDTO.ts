import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateUserDTO {
    @IsString()
    @IsNotEmpty()
    displayName: string;
}