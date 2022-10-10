import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "../../users/entities/user.entity";

export enum TaskStatus {
    open = 'open',
    closed = 'closed',
}

@Entity('task')
export class Task {
    @PrimaryGeneratedColumn ( 'uuid' )
    public_id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToOne(() => User)
    assignee: User;

    @Column({
        type: "enum",
        enum: TaskStatus,
        default: TaskStatus.open,
    })
    status: TaskStatus;
}
