import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User, UserRole} from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (!createUserDto.role) {
      createUserDto.role = UserRole.developer;
    }
    let user = this.userRepository.create(createUserDto);
    user = await this.userRepository.save(user);
    console.log(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(public_id: string) {
    return this.userRepository.findOne({where: {public_id: public_id}});
  }

  findOneByName(name: string) {
    return this.userRepository.findOne({where: {name: name}})
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
