import {Controller, Request, Post, UseGuards, Get, Render, Res} from '@nestjs/common';
import {LocalAuthGuard} from "./auth/quards/local-auth.guard";
import {AuthService} from "./auth/auth.service";
import {JwtAuthGuard} from "./auth/quards/jwt-auth.guard";
import {Public} from "./metadata";
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Get()
  @Public()
  @Render('login_form')
  login_form() {
    return {};
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req, @Res() res: Response) {
    let result = await this.authService.login(req.user);
    res.redirect('/users?jwt='+result.access_token);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}