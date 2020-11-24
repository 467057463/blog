import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ArticlesService } from './articles/articles.service';
import { Article } from './articles/interfaces/article.interface';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly articlesService: ArticlesService
  ) {}

  @Get()
  async getHello(): Promise<Article[]> {
    throw new HttpException('异常', HttpStatus.FORBIDDEN)
    // return this.articlesService.findAll()
  }
}
