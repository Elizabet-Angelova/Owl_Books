import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { User } from "src/Models/user.entity";
import { Review } from "src/Models/review.entity";
import { Book } from "src/Models/book.entity";
import { TransformerService } from "./transformer.service";
import { Repository } from "typeorm";
import { CreateReviewDTO } from "src/Common/DTOs/createReviewDTO";
import { responseMessage } from "src/Enums/response.message.enum";
import { UserService } from "./user.service";
import { BooksService } from "./books.service";
import { ReviewDTO } from "src/Common/DTOs/review.dto";
import { VoteDTO } from "src/Common/DTOs/voteDTO";
import { Reaction } from "src/Enums/reaction.enum";
import { Vote } from "src/Models/vote.entity";
import { UserRole } from "src/Enums/user-role";

@Injectable()
export class ReviewsService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Review) private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Book) private readonly booksRepository: Repository<Book>,
    @InjectRepository(Vote) private readonly votesRepository: Repository<Vote>,
    private readonly transformer: TransformerService,
    private readonly userService: UserService,
    private readonly bookService: BooksService) {
  }

  public async getAll(): Promise<Review[]> {
    return await this.reviewRepository.find({
      where: { isDeleted: false },
      relations: ['author', 'book']
    })
  }

  public async createReview(review: CreateReviewDTO, user: User, bookId: number): Promise<responseMessage> {
    const book = await this.bookService.findBookById(bookId)
    if (!book) {
      return responseMessage['7']
    } else if (user && book) {
      const createReview = { ...review, author: user, book: book, authorUsername: user.username }
      await this.reviewRepository.save(createReview);
      return responseMessage['5'];
    } else {
      return responseMessage['6'];
    }
  }

  public async updateReview(review: CreateReviewDTO, user: User, reviewId: number): Promise<responseMessage> {
    const reviewToUpdate = await this.reviewRepository.findOne({
      where: { id: reviewId, isDeleted: false },
      relations: ['author']
    });
    if (reviewToUpdate.author.id === user.id || user.role === UserRole.Admin) {
      const updatedReview = { ...reviewToUpdate, ...review }
      await this.reviewRepository.save(updatedReview)
      return responseMessage['22'];
    } else {
      return responseMessage['15'];
    }
  }

  public async deleteReview(user: User, reviewId: number): Promise<responseMessage> {
    const reviewToDelete = await this.reviewRepository.findOne({
      where: { id: reviewId, isDeleted: false },
      relations: ['author']
    });
      await this.reviewRepository.save({ ...reviewToDelete, isDeleted: true })
      return responseMessage['4'];
  }

  public async deleteReviewByADMIN(reviewId: number): Promise<responseMessage> {
    const reviewToDelete = await this.reviewRepository.findOne({
      where: {
        id: reviewId,
        isDeleted: false
      }
    });
    if (reviewToDelete) {
      await this.reviewRepository.save({ ...reviewToDelete, isDeleted: true })
      return responseMessage['4'];
    } else {
      return responseMessage['14'];
    }
  }

  public async getVotes() {
    return await this.votesRepository.find({
      relations: ['voter', 'review']
    })
  }
  public async giveVote(voteBody: VoteDTO, user: User, reviewId: number) {
    const review = await this.reviewRepository.findOne({
      where: { id: reviewId, isDeleted: false },
      relations: ['votes', 'votes.voter']
    });
    const votesByThisUser = review.votes.filter(vote => vote.voter.id === user.id)
    if (votesByThisUser.length === 0) {
      const voteGiven = { ...new Vote, reaction: voteBody.reaction, voter: user, review: review }
      this.votesRepository.save(voteGiven)
      if ((Reaction[voteGiven.reaction] === Reaction[1])) {
        return 'You liked the review!'
      } else {
        return 'You disliked the review!'
      }
    }
    if (votesByThisUser && Reaction[votesByThisUser[0].reaction] === Reaction[voteBody.reaction]) {
      const vote = votesByThisUser[0]
      await this.votesRepository.remove(vote)
      return 'You\'re vote vas removed!'
    }
    if (votesByThisUser && Reaction[votesByThisUser[0].reaction] !== Reaction[voteBody.reaction]) {
      const vote = votesByThisUser[0]
      await this.votesRepository.remove(vote)
      const voteGiven = { ...new Vote, reaction: voteBody.reaction, voter: user, review: review }
      this.votesRepository.save(voteGiven)
      if ((Reaction[voteGiven.reaction] === Reaction[1])) {
        return 'You liked the review!'
      } else {
        return 'You disliked the review!'
      }
    }
  }

}

