import { Controller, Body, Post, Param, Delete, Header, ValidationPipe, UseGuards, ParseIntPipe, Put } from "@nestjs/common";
import { UserService } from "src/Services/user.service";
import { BooksService } from "src/Services/books.service";
import { responseMessage } from "src/Enums/response.message.enum";
import { BlacklistGuard } from "src/auth/blacklist.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { ReviewsService } from "src/Services/reviews.service";
import { UserRole } from "src/Enums/user-role";
import { CreateBookDTO } from "src/Common/DTOs/createBookDTO";
import { BookDTO } from "src/Common/DTOs/book.dto";
import { UserBanDTO } from "src/Common/DTOs/user-ban.dto";

@Controller('admin')


export class AdminController {

    constructor(private readonly userService: UserService,
        private readonly booksService: BooksService,
        private readonly reviewService: ReviewsService,) { }


    @Delete('review/:id')
    @UseGuards(BlacklistGuard)
    public async deleteReviewByAdmin(@Param('id') reviewId: number): Promise<responseMessage> {
        return await this.reviewService.deleteReviewByADMIN(reviewId);
    }


    @Post()
    @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Admin))
    public async createNewBook(@Body(new ValidationPipe({ whitelist: true })) body: CreateBookDTO,): Promise<responseMessage> {
        return await this.booksService.createNewBook(body);
    }

    @Post(':id')
    @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Admin))
    public async updateBook(@Body(new ValidationPipe({ whitelist: true })) body: Partial<BookDTO>, @Param('id') bookId: number): Promise<responseMessage> {
        if (body) {
            return await this.booksService.updateBook(bookId, body);
        } else {
            return responseMessage['6']
        }

    }

    @Delete(':id')
    @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Admin))
    public async deleteBook(@Param('id') bookId: number): Promise<responseMessage> {
        return await this.booksService.deleteBook(bookId);
    }

    @Post(':id/ban')
    @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Admin))
    async banUser(@Param('id', ParseIntPipe) userId: number, @Body(new ValidationPipe({ whitelist: true })) banDto: UserBanDTO): Promise<responseMessage> {
        return await this.userService.banUser(userId, banDto.period);
    }

    @Put(':id')
    @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Admin))
    async deleteUser(@Param('id') userId: string): Promise<responseMessage> {
        return await this.userService.deleteUser(+userId);
    }
}