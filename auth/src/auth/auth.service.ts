import {Injectable} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {JwtService} from "@nestjs/jwt";
import {UserRole} from "../users/entities/user.entity";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
        ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByName(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.name, sub: user.public_id, role: user.role, clientId: user.clientId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}