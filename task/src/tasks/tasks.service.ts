import {Injectable} from '@nestjs/common';
import {CreateTaskDto} from './dto/create-task.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Task, TaskStatus} from "./entities/task.entity";
import {Repository} from "typeorm";
import {UsersService} from "../users/users.service";

@Injectable()
export class TasksService {
  constructor(
      @InjectRepository(Task)
      private taskRepository: Repository<Task>,
      private userService: UsersService,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    let assignee = await this.userService.findRandomUser();
    if (!assignee) {
      console.log('no assignee');
      return;
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

  async closeTask(id: string) {
    let task = await this.taskRepository.findOne({where: {public_id: id}});
    if (!task) {
      console.log('no task by id '+id);
      return;
    }
    task.status = TaskStatus.closed;
    await this.taskRepository.save(task);
  }

  async shuffle() {
    const tasks = await this.taskRepository.find({where: {status: TaskStatus.open}});
    for (let i in tasks) {
      await this._reassign(tasks[i]);
    }
  }

  async _reassign(task: Task) {
    let assignee = await this.userService.findRandomUser();
    if (!assignee) {
      console.log('no assignee');
      return;
    }
    task.assignee = assignee;
    await this.taskRepository.save(task);
  }
}
