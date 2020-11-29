import * as mongoose from 'mongoose';

export interface Article extends mongoose.Document {
  title: string;
  content: string;
  author: string;
}

