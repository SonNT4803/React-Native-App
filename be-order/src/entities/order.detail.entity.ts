import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Food } from './food.entity';
import { Order } from './order.entity';

@Entity('order_details')
export class OrderDetail extends BaseEntity {
  @Column()
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  order: Order;

  @ManyToOne(() => Food, (food) => food.orderDetails)
  food: Food;
}
