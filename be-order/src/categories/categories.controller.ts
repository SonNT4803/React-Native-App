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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/guard/roles.decorator';
import { Public } from '../auth/guard/public.decorator';

@Controller('categories')
@UseGuards(RolesGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Roles('Admin')
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<{ statusCode: HttpStatus; message: string; data: any }> {
    try {
      const result = await this.categoriesService.create(createCategoryDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Category created successfully',
        data: result,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message || 'Failed to create category',
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
      const result = await this.categoriesService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Categories retrieved successfully',
        data: result,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Failed to retrieve categories',
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
      const result = await this.categoriesService.findOne(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Category retrieved successfully',
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
        message: error.message || 'Failed to retrieve category',
        data: null,
      };
    }
  }

  @Put(':id')
  @Roles('Admin')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<{ statusCode: HttpStatus; message: string; data?: any }> {
    try {
      const result = await this.categoriesService.update(id, updateCategoryDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Category updated successfully',
        data: result,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message || 'Failed to update category',
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
      await this.categoriesService.remove(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Category deleted successfully',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message || 'Failed to delete category',
      };
    }
  }
}
