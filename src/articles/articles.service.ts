import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './interfaces/article.interface'
import { Comment } from './interfaces/comment.interface'
import { ArticleDto } from './articles.dto';
import { CommentDto } from './comments.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel('Article') private readonly articleModel:Model<Article>,
    @InjectModel('Comment') private readonly commentModel:Model<Comment>
  ){}

  async create(articleDto: ArticleDto): Promise<Article>{
    const createArticle = new this.articleModel(articleDto)
    return createArticle.save()
  }

  async findAll(page = 1, quantity = 10): Promise<Article[]>{
    page = Number(page);
    quantity = Number(quantity);
    return this.articleModel.find()
      .populate('author', 'username')
      .sort({'updatedAt':-1})
      .skip((page - 1) * quantity)
      .limit(quantity)
      .exec()
  }

  async findById(id: string): Promise<any>{
    return this.articleModel.findById(id)
      .populate('author', 'username')
      .populate({
        path: 'comments',
        populate: { 
          path: 'author',
          select: 'username'
        }
      })
      .exec()
  }

  async updateArticle(id: string, article: any){
    const doc = await this.articleModel.updateOne({_id: id}, article);
    return doc
  }

  async incView(id: string){
    return this.articleModel.update({_id: id}, {
      $inc: {'meta.view': 1}
    })
  }  

  async deleteArticle(id: string): Promise<any>{
    return this.articleModel.deleteOne({_id: id})
  }

  async like(id: string, isLike: boolean, userId){
    if(isLike){
      return this.articleModel.update({_id: id}, {
        $inc: {
          'meta.like': 1,
        },  
        $addToSet:{
          'meta.likeUsers': userId
        },      
      })
    }else{
      return this.articleModel.update({_id: id}, {
        $inc: {
          'meta.like': isLike ? 1 : -1,
        },  
        $unset:{
          'meta.likeUsers': userId
        }
      })
    }
  }

  async createComment(articleId: string, commentDto: CommentDto){
    const createComment = new this.commentModel(commentDto)
    const comment = await createComment.save();
    await this.articleModel.update({_id: articleId}, {
      $addToSet:{
        comments: comment._id
      },      
    })
    return comment;
  }
}

