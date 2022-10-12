import {Controller, Request, Post, UseGuards, Get, Render, Res, Query, Body} from '@nestjs/common';
import {LocalAuthGuard} from "./auth/quards/local-auth.guard";
import {AuthService} from "./auth/auth.service";
import {Public} from "./metadata";
import { Response } from 'express';
import {LoginDto} from "./auth/dto/login.dto";

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Get()
  @Public()
  @Render('login_form')
  login_form(@Query() query) {
    return {
      clientId: query.client_id,
    };
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
      @Request() req,
      @Body() loginDto: LoginDto,
      @Res() res: Response
  ) {
    let user = req.user;
    user['clientId'] = loginDto.clientId;
    let result = await this.authService.login(req.user);
    if (!!loginDto.clientId) {
      res.redirect('http://localhost:1000/tasks?jwt='+result.access_token);
    } else {
      res.redirect('/users?jwt='+result.access_token);
    }
  }

}