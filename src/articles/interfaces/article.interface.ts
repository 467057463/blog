import * as mongoose from 'mongoose';

export interface Article extends mongoose.Document {
  _id: string;
  title: string;
  content: string;
  author: string;
}

