import {Controller, Get, Post, Body, Patch, Param, Delete, Res, Render, Query} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
      @Body() createUserDto: CreateUserDto,
      @Res() res: Response,
      @Query() query,
      ) {
    await this.usersService.create(createUserDto);
    res.redirect('users?jwt='+query.jwt);
  }

  @Get('create_form')
  @Render('create_form')
  create_form(@Query() query) {
    return {jwt: query.jwt};
  }

  @Get()
  @Render('users')
  async findAll(@Query() query) {
    return {list: await this.usersService.findAll(), jwt: query.jwt};
  }

  @Get(':id')
  findOne(@Param('id') public_id: string) {
    return this.usersService.findOne(public_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
