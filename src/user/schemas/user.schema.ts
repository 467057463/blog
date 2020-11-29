import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, '用户名不能为空'],
    unique: true,
    minlength: [6, '用户名长度不能低于6个字符'],
    validate: {
      validator: function(v){
        return /\d{3}-\d{3}-\d{4}/.test(v)
      },
      message: '用户名格式不对'
    }
    // dropDups: [true, '用户名已注册']
  },
  password: {
    type: String,
    required: true
  }
},{
  timestamps:true
})

UserSchema.plugin(uniqueValidator, { message: '用户名已注册' });