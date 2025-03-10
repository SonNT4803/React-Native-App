// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { UserRole } from 'src/entities/user.role.entity';
import { User } from 'src/entities/users.entity';
import { UserRoleModule } from 'src/user-role/user-role.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [UserRoleModule, TypeOrmModule.forFeature([User, Role, UserRole])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
