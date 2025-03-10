// src/auth/auth.module.ts
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserRoleModule } from 'src/user-role/user-role.module';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

import { APP_GUARD } from '@nestjs/core';
import { RoleModule } from 'src/role/role.module';
import { AuthController } from './auth.controller';
import { jwtConstants } from './const';
import { AuthGuard } from './guard/auth.guard';
import { RolesGuard } from './guard/roles.guard';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants,
      signOptions: { expiresIn: '365d' },
    }),
    UserModule,
    RoleModule,
    UserRoleModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    RolesGuard,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
