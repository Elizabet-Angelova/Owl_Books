import { Controller, Get, Query, Param, Post, Put, Delete, UseGuards, ValidationPipe, Body } from "@nestjs/common";
import { BooksService } from "src/Services/books.service";
import { BookDTO } from "src/Common/DTOs/book.dto";
import { responseMessage } from "src/Enums/response.message.enum";
import { BlacklistGuard } from "src/auth/blacklist.guard";
import { UserDecorator } from "src/Auth/user-id.decorator";
import { User } from "src/Models/user.entity";

@Controller('books')

export class BooksController {

    constructor(private readonly booksService: BooksService) { }

    @Get() 
    @UseGuards(BlacklistGuard)
    public async getAll(): Promise<BookDTO[]> {
        return await this.booksService.allbooks();
    }


    @Get(':id')  
    @UseGuards(BlacklistGuard)
    public async findOne(@Param('id') id: number): Promise<BookDTO> {
        return await this.booksService.findBookById(id)
    }

    @Get(':name/search')
    @UseGuards(BlacklistGuard)
    public async find(@Param('name') name: string): Promise<BookDTO[]> {
        return await this.booksService.findBookBySearch(name);
    }


    @Post(':id')
    @UseGuards(BlacklistGuard)
    public async borrowBook(@UserDecorator() user: User, @Param('id') bookId: number): Promise<responseMessage> {
        return await this.booksService.borrowBook(user, bookId)
    }

    @Delete(':id') 
    @UseGuards(BlacklistGuard)
    public async returnBook(@UserDecorator() user: User, @Param('id') bookId: number): Promise<responseMessage> {
        return await this.booksService.returnBook(user, bookId)
    }

}