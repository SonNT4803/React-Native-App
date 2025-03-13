import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Food } from '../entities/food.entity';
import { CreateFoodDto, UpdateFoodDto } from './dto/food.dto';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private readonly foodRepository: Repository<Food>,
  ) {}

  async create(createFoodDto: CreateFoodDto): Promise<Food> {
    const food = this.foodRepository.create(createFoodDto);
    return await this.foodRepository.save(food);
  }

  async findAll(): Promise<Food[]> {
    return await this.foodRepository.find({
      relations: ['category'],
    });
  }

  async findByCategoryId(categoryId: number): Promise<Partial<Food>[]> {
    const foods = await this.foodRepository.find({
      where: { category: { id: categoryId } },
      relations: ['category'],
    });

    return foods.map((food) => ({
      id: food.id,
      name: food.name,
      price: food.price,
      description: food.description,
      image: food.image,
      isAvailable: food.isAvailable,
    }));
  }

  async findOne(id: number): Promise<Food> {
    const food = await this.foodRepository.findOne({ where: { id } });
    if (!food) {
      throw new NotFoundException('Food not found');
    }
    return food;
  }

  async update(id: number, updateFoodDto: UpdateFoodDto): Promise<Food> {
    const food = await this.findOne(id);
    Object.assign(food, updateFoodDto);
    return await this.foodRepository.save(food);
  }

  async remove(id: number): Promise<void> {
    const food = await this.findOne(id);
    await this.foodRepository.softDelete(id);
  }

  async findRecommendedFood(limit: number = 5): Promise<Food[]> {
    // Lấy tất cả các danh mục có sẵn
    const categories = await this.foodRepository
      .createQueryBuilder('food')
      .select('food.category')
      .groupBy('food.category')
      .getRawMany();

    // Lấy danh sách ID của các danh mục
    const categoryIds = categories.map((c) => c.food_category);

    // Nếu không có danh mục nào, trả về mảng rỗng
    if (categoryIds.length === 0) {
      return [];
    }

    // Tạo một mảng để lưu trữ các món ăn được đề xuất
    const recommendedFoods: Food[] = [];

    // Lấy món ăn ngẫu nhiên từ mỗi danh mục
    for (const categoryId of categoryIds) {
      if (recommendedFoods.length >= limit) break;

      const randomFood = await this.foodRepository
        .createQueryBuilder('food')
        .leftJoinAndSelect('food.category', 'category')
        .where('category.id = :categoryId', { categoryId })
        .andWhere('food.isAvailable = :isAvailable', { isAvailable: true })
        .orderBy('RAND()') // PostgreSQL
        // Nếu sử dụng MySQL: .orderBy('RAND()')
        .take(1)
        .getOne();

      if (randomFood) {
        recommendedFoods.push(randomFood);
      }
    }

    // Nếu chưa đủ số lượng, lấy thêm các món ăn ngẫu nhiên
    if (recommendedFoods.length < limit) {
      const remainingCount = limit - recommendedFoods.length;
      const existingIds = recommendedFoods.map((food) => food.id);

      const additionalFoods = await this.foodRepository
        .createQueryBuilder('food')
        .leftJoinAndSelect('food.category', 'category')
        .where('food.isAvailable = :isAvailable', { isAvailable: true })
        .andWhere('food.id NOT IN (:...existingIds)', {
          existingIds: existingIds.length > 0 ? existingIds : [0],
        })
        .orderBy('RAND()') // PostgreSQL
        // Nếu sử dụng MySQL: .orderBy('RAND()')
        .take(remainingCount)
        .getMany();

      recommendedFoods.push(...additionalFoods);
    }

    return recommendedFoods;
  }

  async findRandomFoodForYou(limit: number = 10): Promise<Food[]> {
    // Lấy danh sách món ăn ngẫu nhiên có sẵn
    const randomFoods = await this.foodRepository
      .createQueryBuilder('food')
      .leftJoinAndSelect('food.category', 'category')
      .where('food.isAvailable = :isAvailable', { isAvailable: true })
      .orderBy('RAND()') // Nếu dùng MySQL
      // .orderBy('RANDOM()') // Nếu dùng PostgreSQL
      .take(limit)
      .getMany();

    return randomFoods; // Trả về trực tiếp kết quả từ repository
  }
}
