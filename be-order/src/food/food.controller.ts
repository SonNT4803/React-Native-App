import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { Public } from '../auth/guard/public.decorator';
import { Roles } from '../auth/guard/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { CreateFoodDto, UpdateFoodDto } from './dto/food.dto';
import { FoodService } from './food.service';

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

  @Get('category/:categoryId')
  @Public()
  @HttpCode(HttpStatus.OK)
  async findByCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<{
    statusCode: HttpStatus;
    message: string;
    data: any;
  }> {
    try {
      const result = await this.foodService.findByCategoryId(categoryId);
      return {
        statusCode: HttpStatus.OK,
        message: 'Foods by category retrieved successfully',
        data: result,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Failed to retrieve foods by category',
        data: null,
      };
    }
  }

  @Get('recommended')
  @Public()
  @HttpCode(HttpStatus.OK)
  async getRecommendedFood(): Promise<{
    statusCode: HttpStatus;
    message: string;
    data: any;
  }> {
    try {
      const result = await this.foodService.findRecommendedFood();
      return {
        statusCode: HttpStatus.OK,
        message: 'Recommended foods retrieved successfully',
        data: result,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Failed to retrieve recommended foods',
        data: null,
      };
    }
  }

  @Get('for-you')
  @Public()
  @HttpCode(HttpStatus.OK)
  async getFoodForYou(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<{
    statusCode: HttpStatus;
    message: string;
    data: any;
  }> {
    try {
      const result = await this.foodService.findRandomFoodForYou(limit);
      return {
        statusCode: HttpStatus.OK,
        message: 'Foods for you retrieved successfully',
        data: result,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Failed to retrieve foods for you',
        data: null,
      };
    }
  }
}
