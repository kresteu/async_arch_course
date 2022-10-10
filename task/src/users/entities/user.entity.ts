import {Column, Entity, OneToMany, PrimaryColumn} from 'typeorm';
import {Task} from "../../tasks/entities/task.entity";

export enum UserRole {
    admin = "admin",
    manager = "manager",
    accountant = "accountant",
    developer = "developer"
}

@Entity('user')
export class User {
    @PrimaryColumn()
    public_id: string;

    @Column()
    name: string;

    @Column({
        type: "enum",
        enum: UserRole
    })
    role: UserRole;

}
