import * as mongoose from 'mongoose';
import * as marked from 'marked'; 
import * as cheerio from 'cheerio';
import * as remark from 'remark';
import * as html from 'remark-html';
import * as toc from 'remark-toc'
import * as extractToc from 'remark-extract-toc';
import * as slug from 'remark-slug';

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
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  meta: {
    view: {
      type: Number,
      default: 0
    },
    like: {
      type: Number,
      default: 0
    },
    likeUsers: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  }
},{
  timestamps:true,
  toJSON: { 
    virtuals: true 
  }
})

ArticleSchema.virtual('contentHtml')
  .get(function(){
    return remark()
    .use(slug)
    .use(html)
    .processSync(this.content)
    .toString()
  })

ArticleSchema.virtual('describe')
  .get(function(){
    return this.contentHtml
      .replace(/<[^>]*>/gi, '')
      .replace(/&nbsp;/gi, '')
      .replace('\n', '')
      .substr(0, 150)
  })

ArticleSchema.virtual('menu')
  .get(function(){
    const processor = remark().use(slug).use(extractToc, {
      keys: ["data"]
    });
    const node = processor.parse(this.content);
    const tree = processor.runSync(node);
    return tree
  })
