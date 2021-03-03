import { Book } from "src/Models/book.entity";
import { BookDTO } from "src/Common/DTOs/book.dto";
import { Review } from "src/Models/review.entity";
import { ReviewDTO } from "src/Common/DTOs/review.dto";
import { User } from "src/Models/user.entity";
import { UserDTO } from "src/Common/DTOs/user.dto";

export class TransformerService {

    toBookDTO(book: Book): BookDTO {
        return {
            id: book.id,
            name: book.name,
            author: book.author,
            description: book.description,
            img: book.img,
            reviews: book.reviews ? book.reviews
                .filter(review => !review.isDeleted)
                .map(review => this.toReviewDTO(review)) : null,
            borrowedBy: book.borrowedBy ? this.toUserDTO(book.borrowedBy) : null,
        }
    }

    toReviewDTO(review: Review): ReviewDTO {
        return {
            id: review.id,
            content: review.content,
            authorUsername: review.authorUsername,
            author: review.author,
            votes: review.votes,
        }
    }


    toUserDTO(user: User): UserDTO {
        return {
            id: user.id,
            username: user.username,
            avatar: user.avatar,
            banEndDate: user.banEndDate ? user.banEndDate.toString() : null,
            displayName: user.displayName,
            borrowedBooks: user.borrowedBooks ? user.borrowedBooks.map(book => this.toBookDTO(book)) : null,
            reviews: user.reviews ? user.reviews
                .filter(review => !review.isDeleted)
                .map(review => this.toReviewDTO(review)) : null,
            votes: user.votes ? user.votes : null,
        }
    }

}