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
    return this.articleModel.find().exec()
    // return this.articles;
  }
}

