import { Body, Controller, Get, Param, Post, UseGuards, Request } from '@nestjs/common';

import { ArticlesService } from './articles.service';
import { ArticleDto } from './articles.dto';
import { Article } from './interfaces/article.interface';
import { JwtAuthGuard } from '../shared/guard/jwt-auth.guard';
import { resSuccess } from '../shared/util';



@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService
  ){}

  @Get()
  async findAll(): Promise<any>{
    const result = await this.articlesService.findAll()
    return resSuccess(null, result)
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req,
    @Body() articleDto: ArticleDto
  ): Promise<any>{
    articleDto.author = req.user.userId;
    const article = await this.articlesService.create(articleDto);
    return resSuccess('文章添加成功', article);
  }

  @Get(':id')
  findOne(
    @Param('id') id
  ):string{
    return id
  }
}
