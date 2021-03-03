import { Module } from "@nestjs/common";
import { BooksController } from "src/Controllers/books.controller";
import { BooksService } from "src/Services/books.service";



@Module({
    controllers: [BooksController],
    providers: [BooksService],
})

export class BooksModule {}