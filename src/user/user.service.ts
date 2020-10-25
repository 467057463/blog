import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interfaces';


@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel:Model<User>
    
  ){}

  async create(user): Promise<User>{
    return this.userModel.create(user)
  }
}
