import { ReviewsService } from "src/Services/reviews.service";
import { Controller, Post, Body, Param, Get, UseGuards, Put, Delete } from "@nestjs/common/decorators";
import { ValidationPipe } from "@nestjs/common";
import { CreateReviewDTO } from "src/Common/DTOs/createReviewDTO";
import { UserDecorator } from "src/Auth/user-id.decorator";
import { responseMessage } from "src/Enums/response.message.enum";
import { User } from "src/Models/user.entity";
import { BlacklistGuard } from "src/auth/blacklist.guard";
import { VoteDTO } from "src/Common/DTOs/voteDTO";

@Controller('reviews')

export class ReviewsController {

    constructor(private readonly reviewService: ReviewsService) { }

    @Get() 
    @UseGuards(BlacklistGuard)
    public async getAllReviews() {
        return await this.reviewService.getAll();
    }

    @Post(':id')
    @UseGuards(BlacklistGuard)
    public async createReview(@Body(new ValidationPipe({ whitelist: true })) body: CreateReviewDTO, @UserDecorator() user: User, @Param('id') bookId: number): Promise<responseMessage> {
        return await this.reviewService.createReview(body, user, bookId);
    }

    @Put(':id')
    @UseGuards(BlacklistGuard)
    public async updateReview(@Body(new ValidationPipe({ whitelist: true })) body: CreateReviewDTO, @UserDecorator() user: User, @Param('id') reviewId: number): Promise<responseMessage> {
        return await this.reviewService.updateReview(body, user, reviewId);
    }

    @Delete(':id')
    @UseGuards(BlacklistGuard)
    public async deleteReview(@UserDecorator() user: User, @Param('id') reviewId: number): Promise<responseMessage> {
        return await this.reviewService.deleteReview(user, reviewId);
    }

    @Post(':id/vote')
    @UseGuards(BlacklistGuard)
    public async vote(@Body(new ValidationPipe({ whitelist: true })) body: VoteDTO, @UserDecorator() user: User, @Param('id') reviewId: number) {
        return await this.reviewService.giveVote(body, user, reviewId);
    }

    @Get('/votes')
    @UseGuards(BlacklistGuard)
    public async getVotes() {
        return await this.reviewService.getVotes();
    }


}