import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { User } from "./user.entity";
import { Book } from "./book.entity";
import { Vote } from "./vote.entity";

@Entity('reviews')
export class Review {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'nvarchar' })
    content: string;

    @Column({ default: false })
    isDeleted: boolean;

    @Column({ type: 'nvarchar' })
    authorUsername: string;

    @ManyToOne(type => User, user => user.reviews)
    author: User;

    @ManyToOne(type => Book, book => book.reviews)
    book: Book;

    @OneToMany(type => Vote, vote => vote.review)
    votes: Vote[]

}