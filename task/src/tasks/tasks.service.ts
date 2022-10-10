import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Task} from "./entities/task.entity";
import {Repository} from "typeorm";
import {User, UserRole} from "../users/entities/user.entity";

@Injectable()
export class TasksService {
  constructor(
      @InjectRepository(Task)
      private taskRepository: Repository<Task>,
      @InjectRepository(User)
      private userRepository: Repository<User>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    //todo find random user
    let assignee = await this.userRepository.findOne({where: {role: UserRole.developer}});
    if (!assignee) {
      console.log('no assignee');
      return;//todo throw exception
    }
    let task = this.taskRepository.create({
      title: createTaskDto.title,
      description: createTaskDto.description,
      assignee: assignee,
    });
    task = await this.taskRepository.save(task);
    console.log(task);
  }

  findAll() {
    //todo use current user id
    return this.taskRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
