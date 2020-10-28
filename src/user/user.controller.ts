import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service'
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';


@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ){}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Request() req
  ){
    return this.authService.login(req.user);
  }

  @Post()
  register(
    @Body() user
  ){
    return this.userService.create(user)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(
    @Request() req
  ){
    return req.user
  }
}
