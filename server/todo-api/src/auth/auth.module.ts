import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { bodyValidatorMiddleware } from './middlewares/body-validator.middleware';
import { UsersModule } from '../users/users.module';
// Strategies
import { JwtStrategy } from './passport/jwt.strategy';
import { LocalStrategy } from './passport/local.strategy';

import { authenticate } from 'passport';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
