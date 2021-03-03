import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToOne } from "typeorm";
import { User } from "./user.entity";
import { Reaction } from "src/Enums/reaction.enum";
import { Review } from "./review.entity";

@Entity('votes')
export class Vote {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.votes)
    voter: User;

    @ManyToOne(() => Review, review => review.votes)
    review: Review;
    
    @Column({type: 'enum', enum: Reaction, default: Reaction.Like})
    reaction: Reaction;
}