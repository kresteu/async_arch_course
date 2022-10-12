import {Controller, Get, Post, Body, Request, Param, Render, Res, Query} from '@nestjs/common';
import { Response } from 'express';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(
      @Body() createTaskDto: CreateTaskDto,
      @Query() query,
      @Res() res: Response
  ) {
    await this.tasksService.create(createTaskDto);
    res.redirect('tasks?jwt='+query.jwt);
  }

  @Get()
  async findAll(
      @Query() query,
      @Res() res: Response,
      @Request() req,
      ) {
    console.log(req.user);
    return res.render(
        'tasks/list',
        {
          jwt: query.jwt,
          list: await this.tasksService.findAll(),
        },
    );
  }

  @Get('create_form')
  @Render('tasks/create_form')
  create_form(@Query() query,) {
    return {jwt: query.jwt};
  }

  @Get('close/:id')
  async close(
      @Param('id') id: string,
      @Query() query,
      @Res() res: Response
  ) {
    console.log(`id: ${id}`)
    await this.tasksService.closeTask(id);
    res.redirect('/tasks?jwt='+query.jwt);
  }

  @Get('shuffle')
  async shuffle(@Query() query, @Res() res: Response) {
    await this.tasksService.shuffle();
    res.redirect('/tasks?jwt='+query.jwt);
  }

}
