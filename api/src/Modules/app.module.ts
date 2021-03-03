import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControllersModule } from './controllers.module';
import { Book } from 'src/Models/book.entity';
import { User } from 'src/Models/user.entity';
import { Review } from 'src/Models/review.entity';
import { jwtConstants } from 'src/Constant/secret';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Token } from 'src/Models/token.entity';
import { Vote } from 'src/Models/vote.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mariadb',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'booksdb',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true
  }),
  ControllersModule
],
})
export class AppModule {}
