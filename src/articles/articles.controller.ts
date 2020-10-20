import { Controller, Get } from '@nestjs/common';

@Controller('articles')
export class ArticlesController {
  @Get()
  findAll(): string {
    return 'articles'
  }
}
