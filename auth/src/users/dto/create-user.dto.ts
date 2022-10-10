import {UserRole} from "../entities/user.entity";

export class CreateUserDto {
    name: string;
    password: string;
    role?: UserRole;
}
