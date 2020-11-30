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
    // this.articles.push(article)
  }

  async findAll(): Promise<Article[]>{
    return this.articleModel.find()
      .populate('author', 'username').exec()
    // return this.articles;
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
}

