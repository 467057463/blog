import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service'
import { UserModule } from '../user/user.module'
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy  } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      session: true
    }),
    JwtModule.register({
      secret: 'jwtConstants.secret',
      signOptions: { expiresIn: '30d' },
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
