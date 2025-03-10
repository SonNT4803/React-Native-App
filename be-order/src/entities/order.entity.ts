import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { OrderDetail } from './order.detail.entity';
import { User } from './users.entity';

@Entity('orders')
export class Order extends BaseEntity {
  @CreateDateColumn()
  orderDate: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ default: 'pending' })
  status: string; // pending, confirmed, delivering, completed, cancelled

  @Column({ nullable: true })
  deliveryAddress: string;

  @Column({ nullable: true })
  note: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];
}
