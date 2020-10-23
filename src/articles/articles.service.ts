import { Injectable } from '@nestjs/common';
import { Article } from './interfaces/article.interface'

@Injectable()
export class ArticlesService {
  private readonly articles: Article[] = []

  create(article: Article){
    this.articles.push(article)
  }

  findAll(): Article[]{
    return this.articles;
  }
}

