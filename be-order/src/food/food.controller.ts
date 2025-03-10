import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto, UpdateFoodDto } from './dto/food.dto';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/guard/roles.decorator';
import { Public } from '../auth/guard/public.decorator';

@Controller('food')
@UseGuards(RolesGuard)
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  @Roles('Admin')
  async create(
    @Body() createFoodDto: CreateFoodDto,
  ): Promise<{ statusCode: HttpStatus; message: string; data: any }> {
    try {
      const result = await this.foodService.create(createFoodDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Food created successfully',
        data: result,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message || 'Failed to create food',
        data: null,
      };
    }
  }

  @Get()
  @Public()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<{
    statusCode: HttpStatus;
    message: string;
    data: any;
  }> {
    try {
      const result = await this.foodService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Foods retrieved successfully',
        data: result,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Failed to retrieve foods',
        data: null,
      };
    }
  }

  @Get(':id')
  @Public()
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ statusCode: HttpStatus; message: string; data: any }> {
    try {
      const result = await this.foodService.findOne(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Food retrieved successfully',
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
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Failed to retrieve food',
        data: null,
      };
    }
  }

  @Put(':id')
  @Roles('Admin')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFoodDto: UpdateFoodDto,
  ): Promise<{ statusCode: HttpStatus; message: string; data?: any }> {
    try {
      const result = await this.foodService.update(id, updateFoodDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Food updated successfully',
        data: result,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message || 'Failed to update food',
        data: null,
      };
    }
  }

  @Delete(':id')
  @Roles('Admin')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ statusCode: HttpStatus; message: string }> {
    try {
      await this.foodService.remove(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Food deleted successfully',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message || 'Failed to delete food',
      };
    }
  }
}
