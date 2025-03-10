import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateOrderStatusDto } from 'src/food/dto/food.dto';
import { Repository } from 'typeorm';
import { Food } from '../entities/food.entity';
import { OrderDetail } from '../entities/order.detail.entity';
import { Order } from '../entities/order.entity';
import { User } from '../entities/users.entity';
import { CreateOrderDto } from './dto/orders.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(Food)
    private readonly foodRepository: Repository<Food>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { userId, items, deliveryAddress, note } = createOrderDto;

    // Kiểm tra người dùng
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Tính tổng tiền và kiểm tra món ăn
    let totalAmount = 0;
    const orderDetails = [];

    // Tạo đơn hàng trước
    const order = this.orderRepository.create({
      user,
      totalAmount: 0, // Sẽ cập nhật sau
      deliveryAddress,
      note,
    });

    // Lưu order để có ID
    await this.orderRepository.save(order);

    for (const item of items) {
      const food = await this.foodRepository.findOne({
        where: { id: item.foodId },
      });
      if (!food) {
        throw new NotFoundException(`Food with ID ${item.foodId} not found`);
      }
      if (!food.isAvailable) {
        throw new ForbiddenException(
          `Food with ID ${item.foodId} is not available`,
        );
      }

      totalAmount += food.price * item.quantity;

      const orderDetail = this.orderDetailRepository.create({
        order,
        food,
        quantity: item.quantity,
        price: food.price,
      });

      // Lưu order detail
      await this.orderDetailRepository.save(orderDetail);
      orderDetails.push(orderDetail);
    }

    // Cập nhật tổng tiền
    order.totalAmount = totalAmount;
    order.orderDetails = orderDetails;

    // Lưu lại order với tổng tiền đã cập nhật
    await this.orderRepository.save(order);

    // Lấy order với dữ liệu đã được lọc
    const savedOrder = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderDetails', 'orderDetail')
      .leftJoinAndSelect('orderDetail.food', 'food')
      .select([
        'order.id',
        'order.orderDate',
        'order.totalAmount',
        'order.status',
        'order.deliveryAddress',
        'order.note',
        'orderDetail.id',
        'orderDetail.quantity',
        'orderDetail.price',
        'food.id',
        'food.name',
        'food.price',
      ])
      .where('order.id = :id', { id: order.id })
      .getOne();

    return savedOrder;
  }

  async findAll(userId?: number): Promise<Order[]> {
    const queryBuilder = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderDetails', 'orderDetail')
      .leftJoinAndSelect('orderDetail.food', 'food')
      .select([
        'order.id',
        'order.orderDate',
        'order.totalAmount',
        'order.status',
        'order.deliveryAddress',
        'order.note',
        'orderDetail.id',
        'orderDetail.quantity',
        'orderDetail.price',
        'food.id',
        'food.name',
        'food.price',
      ]);

    if (userId) {
      queryBuilder.where('order.user.id = :userId', { userId });
    }

    return await queryBuilder.getMany();
  }

  async updateStatus(
    id: number,
    updateOrderStatusDto: UpdateOrderStatusDto,
  ): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    order.status = updateOrderStatusDto.status;
    return await this.orderRepository.save(order);
  }

  async remove(id: number): Promise<void> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.status !== 'pending') {
      throw new ForbiddenException(
        'Cannot delete order that is not in pending status',
      );
    }

    await this.orderRepository.softDelete(id);
  }
}
