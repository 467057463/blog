import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

import { generateMongoUri } from './util/index'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: generateMongoUri(
            configService.get('DATABASE_USER'), 
            configService.get('DATABASE_PASSWORD'), 
            configService.get('DATABASE_NAME')
          ),
          useNewUrlParser: true,
        }
      },
      inject: [ConfigService],
    }),
    ArticlesModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
