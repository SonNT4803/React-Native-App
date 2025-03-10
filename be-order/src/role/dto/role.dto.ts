// src/role/dto/role.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class RoleDto {
  @IsOptional()
  id?: number;

  @IsString()
  name: string;
}
