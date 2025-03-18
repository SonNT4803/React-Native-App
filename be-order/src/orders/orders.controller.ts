import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UpdateOrderStatusDto } from 'src/food/dto/food.dto';
import { Roles } from '../auth/guard/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { GetUser } from '../auth/guard/user.decorator';
import { CreateOrderDto } from './dto/orders.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
@UseGuards(RolesGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<{ statusCode: HttpStatus; message: string; data: any }> {
    try {
      const result = await this.ordersService.create(createOrderDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Order created successfully',
        data: result,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message || 'Failed to create order',
        data: null,
      };
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('userId') userId?: number,
    @GetUser() user?: any,
  ): Promise<{ statusCode: HttpStatus; message: string; data: any }> {
    try {
      let result;
      if (user && user.role === 'Customer') {
        result = await this.ordersService.findAll(user.id);
      } else {
        result = await this.ordersService.findAll(userId);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Orders retrieved successfully',
        data: result,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Failed to retrieve orders',
        data: null,
      };
    }
  }

  @Patch(':id/status')
  @Roles('Admin', 'Shipper')
  @HttpCode(HttpStatus.OK)
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ): Promise<{ statusCode: HttpStatus; message: string; data?: any }> {
    try {
      const result = await this.ordersService.updateStatus(
        id,
        updateOrderStatusDto,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'Order status updated successfully',
        data: result,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
          data: null,
        };
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message || 'Failed to update order status',
        data: null,
      };
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ statusCode: HttpStatus; message: string }> {
    try {
      await this.ordersService.remove(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Order deleted successfully',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
        };
      }
      if (error instanceof ForbiddenException) {
        return {
          statusCode: HttpStatus.FORBIDDEN,
          message: error.message,
        };
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message || 'Failed to delete order',
      };
    }
  }

  @Get('best-sellers')
  @HttpCode(HttpStatus.OK)
  async getBestSellers(
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<{ statusCode: HttpStatus; message: string; data: any }> {
    try {
      const result = await this.ordersService.getBestSellers(limit);
      return {
        statusCode: HttpStatus.OK,
        message: 'Best sellers retrieved successfully',
        data: result,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Failed to retrieve best sellers',
        data: null,
      };
    }
  }

  @Get('history')
  @HttpCode(HttpStatus.OK)
  async getOrderHistory(
    @Query('userId', new ParseIntPipe({ optional: true })) userId?: number,
    @GetUser() user?: any,
  ): Promise<{ statusCode: HttpStatus; message: string; data: any }> {
    try {
      let result;
      if (user) {
        result = await this.ordersService.getOrderHistory(user.id);
      } else if (userId) {
        // Admin or other roles can view any user's orders if userId is provided
      } else {
        throw new ForbiddenException('User ID is required');
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Order history retrieved successfully',
        data: result,
      };
    } catch (error) {
      if (error instanceof ForbiddenException) {
        return {
          statusCode: HttpStatus.FORBIDDEN,
          message: error.message,
          data: null,
        };
      }
      if (error instanceof NotFoundException) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
          data: null,
        };
      }
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Failed to retrieve order history',
        data: null,
      };
    }
  }
}
