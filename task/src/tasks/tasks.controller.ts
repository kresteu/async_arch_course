import {Controller, Get, Post, Body, Patch, Param, Delete, Render, Res} from '@nestjs/common';
import { Response } from 'express';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(
      @Body() createTaskDto: CreateTaskDto,
      @Res() res: Response
  ) {
    await this.tasksService.create(createTaskDto);
    res.redirect('tasks');
  }

  @Get()
  //@Render('tasks/index')
  async findAll(@Res() res: Response) {
    return res.render(
        'tasks/list',
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

  @Get('close/:id')
  async close(
      @Param('id') id: string,
      @Res() res: Response
  ) {
    console.log(`id: ${id}`)
    await this.tasksService.closeTask(id);
    res.redirect('/tasks');
  }

  @Get('shuffle')
  async shuffle(@Res() res: Response) {
    await this.tasksService.shuffle();
    res.redirect('/tasks');
  }

}
