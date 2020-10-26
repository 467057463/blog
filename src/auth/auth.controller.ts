import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from '../user/user.service'
import { AuthService } from './auth.service'
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService:UserService,
    private readonly authService:AuthService
  ){}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Request() req
  ){
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(
    @Request() req
  ){
    return req.user
  }
}
