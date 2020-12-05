import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { ArticleSchema } from './schemas/article.schema';
import { CommentSchema } from './schemas/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Article',
      schema: ArticleSchema
    },{
      name: 'Comment',
      schema: CommentSchema
    }])
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [ArticlesService]
})
export class ArticlesModule{}