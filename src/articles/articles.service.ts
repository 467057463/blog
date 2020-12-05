import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './interfaces/article.interface'
import { ArticleDto } from './articles.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel('Article') private readonly articleModel:Model<Article>
  ){}

  async create(articleDto: ArticleDto): Promise<Article>{
    const createArticle = new this.articleModel(articleDto)
    return createArticle.save()
  }

  async findAll(): Promise<Article[]>{
    return this.articleModel.find()
      .populate('author', 'username').exec()
  }

  async findById(id: string): Promise<any>{
    // const article = await this.articleModel.findById(id);
    // article.meta.view += 1;
    // article.save()
    return this.articleModel.findById(id)
      .populate('author', 'username').exec()
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
}

