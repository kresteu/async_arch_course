import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User, UserRole} from "./entities/user.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    findRandomUser() {
        return this.userRepository.findOne({where: {role: UserRole.developer}});
    }

    findOneById(id: string) {
        return this.userRepository.findOne({where: {public_id: id}});
    }
}
