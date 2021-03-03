import { Module } from '@nestjs/common';
import { BooksController } from 'src/Controllers/books.controller';
import { ServicesModule } from './services.module';
import { UsersController } from 'src/Controllers/users.controller';
import { AdminController } from 'src/Controllers/admin.controller';
import { AuthController } from 'src/Controllers/auth.controller';
import { ReviewsController } from 'src/Controllers/reviews.controller';


@Module({
    imports: [ServicesModule],
    controllers: [BooksController, UsersController, AdminController, AuthController, ReviewsController],
})
export class ControllersModule { }
