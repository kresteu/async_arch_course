import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

export enum UserRole {
    admin = "admin",
    manager = "manager",
    accountant = "accountant",
    developer = "developer"
}

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    public_id: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: UserRole
    })
    role: UserRole;
}

