import { Body, Controller, Get, Param, Query, Post, UseGuards, Request, Put, Delete, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';

import { ArticlesService } from './articles.service';
import { ArticleDto } from './articles.dto';
import { CommentDto } from './comments.dto';
import { Article } from './interfaces/article.interface';
import { JwtAuthGuard } from '../shared/guard/jwt-auth.guard';
import { resSuccess } from '../shared/util';


@ApiBearerAuth()
@ApiTags('文章')
@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService
  ){}
  
  // 列表
  @Get()
  @ApiQuery({
    name: 'page',
    description: '页码',
    required: false,
    type: Number,
    example: 1, 
  })
  @ApiQuery({
    name: 'quantity',
    description: '每页显示的数量',
    required: false,
    type: Number,
    example: 10, 
  })
  async list(
    @Query('page') page,
    @Query('quantity') quantity
  ): Promise<any>{
    const result = await this.articlesService.findAll(page, quantity)
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
    if(article){
      await this.articlesService.incView(id)
      return resSuccess(null, article)
    }else{
      throw new NotFoundException('改文章不存在')
    }
  }

  // 更新
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id,
    @Body() articleDto: ArticleDto,
    @Request() req
  ): Promise<any>{
    const article = await this.articlesService.findById(id);
    if(article){
      if(req.user.userId === String(article.author._id)){
        await this.articlesService.updateArticle(id, articleDto)
        return resSuccess('文章更新成功', {
          _id: id
        });
      }else{
        throw new UnauthorizedException('权限异常')
      }      
    }else{
      throw new NotFoundException('改文章不存在')
    }    
  }

  // 删除
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(
    @Param('id') id,
    @Request() req
  ): Promise<any>{
    const article = await this.articlesService.findById(id);
    if(article){
      if(req.user.userId === String(article.author._id)){
        await this.articlesService.deleteArticle(id);
        return resSuccess('文章删除成功', null);
      }else{
        throw new UnauthorizedException('权限异常')
      }
    }else{
      throw new NotFoundException('改文章不存在')
    } 
  }

  // 点赞
  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  async like(
    @Param('id') id,
    @Body('like') islike,
    @Request() req
  ){
    const article = await this.articlesService.findById(id);
    if(article){
      await this.articlesService.like(id, !!islike, req.user.userId)
      return resSuccess(`${!!islike ? '点赞成功' : '您已取消点赞' } `, {
        _id: id
      })
    }else{
      throw new NotFoundException('改文章不存在')
    }    
  }

  // 添加评论
  @UseGuards(JwtAuthGuard)
  @Post(':id/comments')
  async createComment(
    @Param('id') id,
    @Request() req,
    @Body() commentDto: CommentDto
  ){
    commentDto.author = req.user.userId;
    commentDto.article = req.user.id;

    const comment = await this.articlesService.createComment(id, commentDto);
    return resSuccess('评论发布成功', comment)
  }

}
