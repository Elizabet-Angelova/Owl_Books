import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "src/Models/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDTO } from "src/Common/DTOs/user.dto";
import { Review } from "src/Models/review.entity";
import { responseMessage } from "src/Enums/response.message.enum";
import { CreateUserDTO } from "src/Common/DTOs/createUserDTO";
import { TransformerService } from "./transformer.service";
import { Book } from "src/Models/book.entity";
import { BooksService } from "./books.service";
import * as bcrypt from 'bcryptjs';
import { UpdateUserDTO } from "src/Common/DTOs/updateUserDTO";
import { UserRole } from "src/Enums/user-role";
import { VoteDTO } from "src/Common/DTOs/voteDTO";
import { Vote } from "src/Models/vote.entity";
import { Reaction } from "src/Enums/reaction.enum";

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Review) private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Book) private readonly booksRepository: Repository<Book>,

    private readonly transformer: TransformerService,
    private readonly bookService: BooksService) {
  }


  public async allUsers(): Promise<UserDTO[]> {
    return (await this.userRepository.find({
      where: { isDeleted: false },
      relations: ['borrowedBooks', 'reviews', 'votes', 'votes.review']
    }))
      .map(u => this.transformer.toUserDTO(u));

  }


  public async createUser(userInfo: CreateUserDTO): Promise<responseMessage> {
    const username = userInfo.username;
    // if (await this.userRepository.findOne({ where: { username: username } })) {
    //   return responseMessage['8']
    // } else {
      const password = userInfo.password = await bcrypt.hash(userInfo.password, 10);
      const user = { ...new User, username, password, displayName: userInfo.displayName }
      await this.userRepository.save(user)

      return responseMessage['9']
    // }
  }

  public async findUserById(id: number): Promise<UserDTO> {
    const foundUser = await this.userRepository.findOne({
      where: {
        id,
        isDeleted: false,
      },
      relations: ['borrowedBooks', 'reviews', 'votes', 'votes.review'],
    });
    if (foundUser === undefined || foundUser.isDeleted) {
      throw new NotFoundException('Invalid User ID');
    }
    return this.transformer.toUserDTO(foundUser);
  }


  public async findUserByName(searchString: string): Promise<UserDTO[]> {
    if (searchString) {
      const allUsers = await this.allUsers()

      const foundUsers: UserDTO[] = allUsers.filter(user =>
        user.username.toLowerCase().includes(searchString.toLowerCase()))
      return foundUsers;
    } else {
      throw new NotFoundException('Invalid search parameter!')
    }

  }


  async banUser(userId: number, period: number): Promise<responseMessage> {
    const user = await this.findUserById(userId);
    user.banEndDate = new Date(Date.now() + period);
    user.borrowedBooks.length = 0;
    await this.userRepository.save(user);
    return responseMessage['23']
  }



  async deleteUser(userId: number): Promise<responseMessage> {
    // const user = await this.findOneOrFail(userId);
    const user2 = await this.userRepository.findOne({where : {id : userId},
      relations: ['borrowedBooks'],})

    if(user2.borrowedBooks.length > 0) {
      user2.borrowedBooks.length = 0;
    } ;
    user2.isDeleted = true;
    await this.userRepository.save(user2);

    await this.reviewRepository
      .createQueryBuilder()
      .update(Review)
      .set({ isDeleted: true })
      .where('authorId = :id', { id: userId })
      .execute();

    return responseMessage['21']
  }


  async recoverUser(userId: number): Promise<{ message: string }> {
    const user = await this.findOneOrFail(userId);

    user.isDeleted = false;
    await this.userRepository.save(user);

    await this.reviewRepository
      .createQueryBuilder()
      .update(Review)
      .set({ isDeleted: false })
      .where('authorId = :id', { id: userId })
      .execute();

    return {
      message: 'User has been recovered!',
    };
  }

  async updateDisplayName(userDto: UpdateUserDTO, userId: number): Promise<responseMessage> {
    const user = await this.findOneOrFail(userId);
    user.displayName = userDto.displayName;
    await this.userRepository.update(userId, user);
    return responseMessage['20'];
  }


  async findOneOrFail(userId: number): Promise<User> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new Error('No such user!')
    }
    return user;
  }


}







