import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from '../entities/order.entity';
import { OrderDetail } from '../entities/order.detail.entity';
import { Food } from '../entities/food.entity';
import { User } from '../entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail, Food, User])],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
