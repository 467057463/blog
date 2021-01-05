import * as mongoose from 'mongoose';
import * as marked from 'marked'; 
import * as cheerio from 'cheerio';
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
    return marked(this.content)
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
    const $ = cheerio.load(this.contentHtml)
    const menuAry = [];
    $('body').children().each(function(index){
      // 判断是否为H开头的标签并且是h2以上
      if(this.name[0].toUpperCase() === 'H' && Number(this.name[1]) > 1){
        // console.log(this.name, $(this).text())
        menuAry.push({
          level: Number(this.name[1] - 1),
          text: this.name,
          href: `head-${index}`
        })
      }
    })
    return menuAry;
  })
