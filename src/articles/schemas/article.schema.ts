import * as mongoose from 'mongoose';
import * as remark from 'remark';
import * as html from 'remark-html';
import * as extractToc from 'remark-extract-toc';
import * as slug from 'remark-slug';
import * as cheerio from 'cheerio';
// import * as hljs from 'highlight.js';
// import * as highlight from 'remark-highlight.js';
import * as remarkPrism from 'remark-prism';
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
    const res = remark()
    // .use(slug)
    // .use(highlight)
    .use(remarkPrism, { 
      showSpotlight: true,
      plugins: [
        // 'autolinker',
        // 'command-line',
        // 'data-uri-highlight',
        // 'diff-highlight',
        // 'inline-color',
        // 'keep-markup',
        'line-numbers',
        // 'show-invisibles',
        // 'treeview',
        // 'line-highlight',
      ]
    })
    .use(html)
    .processSync(this.content)
    .toString()

    const $ = cheerio.load(res);
    $('h1,h2,h3,h4,h5,h6').each(function(i, elem){
      $(this).attr('id', `heading-${i + 1}`)
    })
    return $("body").html();
  })

ArticleSchema.virtual('describe')
  .get(function(){
    const $ = cheerio.load(this.contentHtml);
    return $('body').text().replace(/\n/g, '');
    return this.contentHtml
      .replace(/<[^>]*>/gi, '')
      .replace(/&nbsp;/gi, '')
      .replace('\n', '')
      .substr(0, 150)
  })

ArticleSchema.virtual('menu')
  .get(function(){
    const processor = remark()
    .use(slug)
    .use(extractToc, {
      keys: ["data"]
    });
    const node = processor.parse(this.content);
    const tree = processor.runSync(node);

    let i = 0;
    function walk(tree){
      const res = tree.map(item =>{
        item.data.id = `heading-${++i}`
        if(item.children && item.children.length > 0){
          walk(item.children)
        }
        return item;
      })
      return res;
    }
    return walk(tree);
  })
