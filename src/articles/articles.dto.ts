import { ApiProperty } from '@nestjs/swagger';

export class ArticleDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;
  author: string;
}