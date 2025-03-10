import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsBoolean,
} from 'class-validator';

export class CreateFoodDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @IsOptional()
  @IsNumber()
  categoryId?: number;
}

export class UpdateOrderStatusDto {
  @IsNotEmpty()
  @IsString()
  status: string; // pending, confirmed, delivering, completed, cancelled
}

export class UpdateFoodDto extends CreateFoodDto {}
