import { UserService } from "src/Services/user.service";
import { Controller, Get, Param, Post, Delete, Body, Put, ValidationPipe, UseGuards, ParseIntPipe } from "@nestjs/common";
import { UserDTO } from "src/Common/DTOs/user.dto";
import { CreateReviewDTO } from "src/Common/DTOs/createReviewDTO";
import { responseMessage } from "src/Enums/response.message.enum";
import { ReviewDTO } from "src/Common/DTOs/review.dto";
import { CreateUserDTO } from "src/Common/DTOs/createUserDTO";
import { BooksService } from "src/Services/books.service";
import { User } from "src/Models/user.entity";
import { BlacklistGuard } from "src/auth/blacklist.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { UserRole } from "src/Enums/user-role";
import { UserBanDTO } from "src/Common/DTOs/user-ban.dto";

@Controller('users')

export class UsersController {
    constructor(private readonly usersService: UserService,
        private readonly booksService: BooksService) { }

    @Get() 
    @UseGuards(BlacklistGuard)
    public async getAllUsers(): Promise<UserDTO[]> {
        return this.usersService.allUsers();
    }

    @Get(':id')
    @UseGuards(BlacklistGuard)
    public async findOne(@Param('id') id: number): Promise<UserDTO> {
        return await this.usersService.findUserById(id);
    }

    @Put(':name')
    @UseGuards(BlacklistGuard)
    public async findOneByName(@Param('name') name: string): Promise<UserDTO[]> {
            return await this.usersService.findUserByName(name);
    }


    @Post()
    public async createUser(@Body(new ValidationPipe({ whitelist: true })) body: CreateUserDTO): Promise<responseMessage> {
        return await this.usersService.createUser(body);
    }

    @Post(':id/ban')
    @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Admin))
    public async banUser(@Param('id') userId: number, @Body(new ValidationPipe({ whitelist: true })) body: UserBanDTO): Promise<responseMessage> {
        return await this.usersService.banUser(userId, +body.period);
    }
}

