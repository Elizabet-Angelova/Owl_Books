import { Module } from "@nestjs/common";
import { BooksService } from "src/Services/books.service";
import { TransformerService } from "src/Services/transformer.service";
import { UserService } from "src/Services/user.service";
import { AuthService } from "src/Services/authentication.service";
import { JwtStrategy } from "src/Services/strategy/jwt-strategy";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/Constant/secret";
import { Book } from "src/Models/book.entity";
import { User } from "src/Models/user.entity";
import { Review } from "src/Models/review.entity";
import { Token } from "src/Models/token.entity";
import { ReviewsService } from "src/Services/reviews.service";
import { Vote } from "src/Models/vote.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Book, User, Review, Token, Vote]),
    PassportModule,
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: {
            expiresIn: '7d',
        },
    })],
    providers: [BooksService, TransformerService, UserService, AuthService, JwtStrategy, ReviewsService],
    exports: [BooksService,TransformerService, UserService, AuthService, ReviewsService]
})
export class ServicesModule { }