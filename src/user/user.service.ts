import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interfaces';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel:Model<User>    
  ){}

  async create(user): Promise<User>{
    const hash = await this.getHash(user.password);
    user.password = hash;
    return this.userModel.create(user)
  }

  async findOne(username: string): Promise<User | undefined>{
    return await this.userModel.findOne({username}).exec();
  }

  async getHash(password: string):Promise<string>{
    return await bcrypt.hash(password, 10)
  }

  comparePassword(password, hash){
    return bcrypt.compareSync(password, hash)
  }
}
