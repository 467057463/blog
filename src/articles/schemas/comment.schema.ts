import * as mongoose from 'mongoose';
const { Schema } = mongoose;

export const CommentSchema = new Schema({
  content:{
    type: String,
    required: true
  }
},{
  timestamps:true
})