import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
    ) {
    }


    async findUser(id: string): Promise<any> {
        const user = await this.usersService.findOneById(id);

        if ( !user ) {
            throw new UnauthorizedException();
        }

        return user;
    }

}
