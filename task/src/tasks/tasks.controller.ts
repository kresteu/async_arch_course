import {Controller, Get, Post, Body, Patch, Param, Delete, Render, Res} from '@nestjs/common';
import { Response } from 'express';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Res() res: Response) {
    await this.tasksService.create(createTaskDto);
    res.redirect('tasks');
  }

  @Get()
  //@Render('tasks/index')
  async findAll(@Res() res: Response) {
    return res.render(
        'tasks/index',
        {
          list: await this.tasksService.findAll(),
        },
    );
   // return { message: this.tasksService.findAll() };
  }

  @Get('create_form')
  @Render('tasks/create_form')
  create_form() {
    return {};
  }

  @Get('update_form/:id')
  update_form(@Param('id') id: string) {
    if (!!id) {
      let task = this.tasksService.findOne(+id);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
