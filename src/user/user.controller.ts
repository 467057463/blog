import { Body, Controller, ForbiddenException, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service'
import { LocalAuthGuard } from '../shared/guard/local-auth.guard';
import { JwtAuthGuard } from '../shared/guard/jwt-auth.guard';
import { resSuccess, resError } from '../shared/util/index';


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
    const token = await this.authService.login(req.user);
    return resSuccess(
      "登录成功",
      token
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
      // const data = {};
      // for(const [key, value] of Object.entries(error.errors)){
      //   console.log(key, value)
      //   data[key] = value.message;
      // }
      // console.log(data)
      // throw new ForbiddenException(error.message)
      return resError(error.message)
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
