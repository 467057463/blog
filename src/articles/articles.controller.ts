import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { ArticlesService } from './articles.service';
import { ArticleDto } from './articles.dto';
import { Article } from './interfaces/article.interface';


class Animal {
  // public name = 'mm';
  readonly x = 1;

  constructor(public readonly name){
    // this.name = name;
  }
  getX(){
    return this.x;
  }
  setX(){
    this.x = '1234'
  }
}

class Cat extends Animal{
  getX(){
    return this.x;
  }
}


@Controller('articles')
export class ArticlesController {
  constructor(
    private articlesService: ArticlesService
  ){}

  @Get()
  async findAll(): Promise<Article[]>{
    console.log(Animal)
    const a = new Animal('mm')
    a.x = 1;
    a.x;
    return this.articlesService.findAll()
  }

  @Post()
  async create(
    @Body() articleDto: ArticleDto
  ){
    this.articlesService.create(articleDto);
    return 'create success';
  }

  @Get(':id')
  findOne(
    @Param('id') id
  ):string{
    return id
  }
}
