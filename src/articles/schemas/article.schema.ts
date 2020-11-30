import * as mongoose from 'mongoose';
const { Schema } = mongoose;

export const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  meta: {
    view: {
      type: Number,
      default: 0
    },
    like: {
      type: Number,
      default: 0
    }
  }
},{
  timestamps:true
})
