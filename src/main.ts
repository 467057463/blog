import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const options = new DocumentBuilder()
    .addBearerAuth() 
    .setTitle('api文档')
    .setDescription('nest blog api 文档')
    .setVersion('1.0')
    // .addTag('cats')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api_docs', app, document);

  await app.listen(parseInt(configService.get('APP_PORT')));
}
bootstrap();


