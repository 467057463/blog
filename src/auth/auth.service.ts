import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService:UserService,
    private readonly jwtService:JwtService,
  ){}

  async validateUser(username, password){
    const user = await this.userService.findOne(username)
    if(user && this.userService.comparePassword(password, user.password)){
      const { password, ...result } = user.toJSON()
      return result;
    }else{
      return null;
    }
  }

  async login(user: any){
    const payload = { username: user.username, sub: user._id };
    return {
      user: {
        name: user.username,
        _id: user._id
      },
      access_token: this.jwtService.sign(payload),
    }
  }
}
