import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from "src/Models/book.entity";
import { TransformerService } from "./transformer.service";
import { BookDTO } from "src/Common/DTOs/book.dto";
import { responseMessage } from 'src/Enums/response.message.enum';
import { CreateBookDTO } from 'src/Common/DTOs/createBookDTO';
import { User } from 'src/Models/user.entity';
import { Review } from 'src/Models/review.entity';


@Injectable()
export class BooksService {
  public constructor(
    @InjectRepository(Book) private readonly booksRepository: Repository<Book>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly transformer: TransformerService
  ) { }



  public async allbooks(): Promise<BookDTO[]> {
    return (await this.booksRepository.find({
      where: {
        isDeleted: false,
      },
      relations: ['borrowedBy', 'reviews'],
    }))
      .map(book => this.transformer.toBookDTO(book))
  }

  public async findBookById(id: number): Promise<BookDTO> {
    const foundBook: Book = await this.booksRepository.findOne({
      where: {
        id,
        isDeleted: false,
      },
      relations: ['borrowedBy','reviews', 'reviews.votes'],
    });
    if (foundBook === undefined || foundBook.isDeleted) {
      throw new NotFoundException('Invalid book ID');
    }
  
    return this.transformer.toBookDTO(foundBook);
  }

  public async updateBook(bookID: number, updateInfo: Partial<BookDTO>): Promise<responseMessage> {
    const bookToUpdate = await this.findBookById(bookID)
    if (bookToUpdate && updateInfo) {
      const updated = { ...bookToUpdate, ...updateInfo }
      await this.booksRepository.save(updated)
      return responseMessage["2"]
    } else {
      return responseMessage['7']
    }
  }

  public async deleteBook(bookID: number): Promise<responseMessage> {
    const foundBookToDelete = await this.findBookById(bookID);
    await this.booksRepository.save({ ...foundBookToDelete, isDeleted: true })
    return responseMessage['1']
  }

  public async findBookBySearch(searchString: string): Promise<BookDTO[]> {
    if (searchString) {
      const allBooks: BookDTO[] = await this.allbooks();
      return allBooks.filter(book =>
        book.name.toLowerCase().includes(searchString.toLowerCase()));
    } else {
      throw new NotFoundException('Invalid search parameter!')
    }
  }

  public async borrowBook(user: User, bookId: number): Promise<responseMessage> {
    let book = await this.booksRepository.findOne({
      where: { id: bookId, isDeleted: false },
      relations: ['borrowedBy']
    });

    if (book && user && !book.isDeleted && !book.borrowedBy) {
      book = { ...book, borrowedBy: user };
      await this.booksRepository.save(book)
    } else {
      return responseMessage['6']
    }
    return responseMessage['10']
  }

  public async returnBook(user: User, bookId: number): Promise<responseMessage> {
    let book = await this.booksRepository.findOne({
      where: { id: bookId, isDeleted: false },
      relations: ['borrowedBy', 'reviews']
    });

    if (book && user && book.borrowedBy !== null && book.borrowedBy.id === user.id) {
      book = { ...book, borrowedBy: null }
      await this.booksRepository.save(book)
    } else {
      return responseMessage['13']
    }
    return responseMessage['11']
  }


  public async createNewBook(book: CreateBookDTO): Promise<responseMessage> {
    const newBook = { ...new Book, ...book }
    await this.booksRepository.save(newBook)
    return responseMessage['3'];

  }


}

