import {Controller, Request, Post, UseGuards, Get, Render} from '@nestjs/common';
import {LocalAuthGuard} from "./auth/local-auth.guard";
import {AuthService} from "./auth/auth.service";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {Public} from "./metadata";

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Get()
  @Public()
  @Render('login_form')
  login_form() {
    return {};
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}