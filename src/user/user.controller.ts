import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ){}

  @Post()
  register(
    @Body() user
  ){
    return this.userService.create(user)
  }
}
