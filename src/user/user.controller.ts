import { Body, Controller, ForbiddenException, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service'
import { LocalAuthGuard } from '../shared/guard/local-auth.guard';
import { JwtAuthGuard } from '../shared/guard/jwt-auth.guard';



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
  async register(
    @Body() user
  ){
    try{
      const u = await this.userService.create(user);
      return this.authService.login(u);
    }catch(e){
      throw new ForbiddenException('用户名已注册')
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(
    @Request() req
  ){
    return req.user
  }
}
