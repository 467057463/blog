import { All, Controller, Get, HttpCode, Param, Post, Redirect, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('articles')
export class ArticlesController {
  @Get()
  @Redirect('https://www.baidu.com', 301)
  findAll(
    @Req() request: Request,
  ): any {
    return {
      url: 'https://www.163.com',
      code: 302
    }
  }

  @Post()
  create(): string{
    return 'create success'
  }

  @Get(':id')
  findOne(
    @Param('id') id
  ):string{
    return id
  }
}
