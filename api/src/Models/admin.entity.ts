import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Book } from "./book.entity";
import { Review } from "./review.entity";
import { Vote } from "./vote.entity";

@Entity('admin')
// will add/delete more logic for admin
export class Admin {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({unique: true, type: 'nvarchar'}) 
    username: string;

    @Column({type: 'nvarchar'})
    password: string; 

    @Column()
    avatar: string ;
    
    @Column({default: false})
    isDeleted: boolean; 

    @Column({default: false})
    isBanned: boolean;

    @Column({default: false})
    isLoggedIn: boolean;

    @OneToMany(type => Book, book => book.borrowedBy)
    borrowedBooks: Book[]; 

    @OneToMany(type => Review, review => review.author)
    reviews: Review[]; 

    @OneToMany(type => Vote, vote => vote.voter)
    votes: Vote[]; 
}


