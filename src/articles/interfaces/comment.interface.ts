import * as mongoose from 'mongoose';

export interface Comment extends mongoose.Document {
  content: string;
}

