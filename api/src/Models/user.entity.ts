import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToMany, JoinTable } from "typeorm";
import { Review } from "./review.entity";
import { Book } from "./book.entity";
import { Vote } from "./vote.entity";
import { UserRole } from "src/Enums/user-role";


@Entity('users')
export class User {
    
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({unique: true, type: 'nvarchar'}) 
    username: string;

    @Column({type: 'nvarchar'}) 
    displayName: string;

    @Column({type: 'nvarchar'})
    password: string; 

    @Column({default: 'https://i.imgur.com/EsGkcQJ.png'})
    avatar?: string ;
    
    @Column({default: false})
    isDeleted: boolean; 

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.Basic,
    })
    role: UserRole;

    @OneToMany(type => Book, book => book.borrowedBy)
    borrowedBooks: Book[]; 

    @OneToMany(type => Review, review => review.author)
    reviews: Review[]; 

    @OneToMany(type => Vote, vote => vote.voter)
    votes: Vote[]; 

    @Column({
        nullable: true,
    })
    banEndDate: Date;
}