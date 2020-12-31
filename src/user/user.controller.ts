import { Body, Controller, ForbiddenException, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';


import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service'
import { LocalAuthGuard } from '../shared/guard/local-auth.guard';
import { JwtAuthGuard } from '../shared/guard/jwt-auth.guard';
import { resSuccess, resError } from '../shared/util/index';

import LoginDTO from './dto/login.dto';

@ApiBearerAuth()
@ApiTags('用户')
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
    const res = await this.authService.login(req.user);
    return resSuccess(
      "登录成功",
      res
    );
  }

  @Post()
  async register(
    @Body() user
  ){
    try{
      if(user.password !== user.confirm_password){
        throw new Error('两次输入的密码不一致')
      }
      const u = await this.userService.create(user);
      const token = await this.authService.login(u);
      return resSuccess(
        "注册成功",
        token
      );
    }catch(error){
      return resError(error.message)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('current')
  async getCurrentUser(
    @Request() req
  ){
    return resSuccess('验证成功', {user: req.user})
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(
    @Request() req
  ){
    return req.user
  }
}
