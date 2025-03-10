import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { Food } from '../entities/food.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/const';

@Module({
  imports: [
    TypeOrmModule.forFeature([Food]),
    JwtModule.register({
      secret: jwtConstants,
      signOptions: { expiresIn: '365d' },
    }),
  ],
  providers: [FoodService],
  controllers: [FoodController],
})
export class FoodModule {}
