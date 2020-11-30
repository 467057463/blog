import { Body, Controller, Get, Param, Post, UseGuards, Request, Put, Delete } from '@nestjs/common';

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
  
  // 列表
  @Get()
  async findAll(): Promise<any>{
    const result = await this.articlesService.findAll()
    return resSuccess(null, result)
  }

  // 新建
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req,
    @Body() articleDto: ArticleDto
  ): Promise<any>{
    articleDto.author = req.user.userId;
    const article = await this.articlesService.create(articleDto);
    return resSuccess('文章发表成功', {
      _id: article._id
    });
  }

  // 详情
  @Get(':id')
  async show(
    @Param('id') id
  ): Promise<any>{
    const article = await this.articlesService.findById(id);
    return resSuccess(null, article)
  }

  // 更新
  @Put(':id')
  async update(
    @Param('id') id,
    @Body() articleDto: ArticleDto
  ): Promise<any>{
    await this.articlesService.updateArticle(id, articleDto)
    return resSuccess('文章更新成功', {
      _id: id
    });
  }

  // 删除
  @Delete(':id')
  async delete(
    @Param('id') id
  ): Promise<any>{
    return resSuccess('文章删除成功', null);
  }
}
