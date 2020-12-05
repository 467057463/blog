import * as mongoose from 'mongoose';
const { Schema } = mongoose;

export const CommentSchema = new Schema({
  content:{
    type: String,
    required: true,
  },  
  article:{
    type: Schema.Types.ObjectId,
    ref: 'Article'
  },
  author:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},{
  timestamps:true
})