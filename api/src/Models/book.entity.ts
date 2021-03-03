import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Admin } from "src/Models/admin.entity";
import { User } from "./user.entity";
import { Review } from "./review.entity";

@Entity('books')
export class Book {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unique: true, type: 'nvarchar' })
    name: string;

    @Column({ type: 'nvarchar' })
    author: string;

    @Column({ type: 'nvarchar' })
    description: string;

    @Column({ default: 'No image'})
    img: string;
    
    @Column({ default: false })
    isDeleted: boolean;

    @ManyToOne(type => User, user => user.borrowedBooks)
    @JoinColumn()
    borrowedBy: User;

    @OneToMany(type => Review, review => review.book)
    reviews: Review[];
    

    // addedBY: ShowUserDTO;
}