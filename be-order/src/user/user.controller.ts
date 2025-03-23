import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UserDTO } from 'src/auth/dto/user.dto';
import { UserService } from './user.service';
import { User } from 'src/entities/users.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAllUsers(): Promise<UserDTO[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findUserById(@Param('id') id: number): Promise<User> {
    return this.userService.findUserById(id);
  }

  // Add this new endpoint
  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body()
    updateUserDto: {
      firstName?: string; // Added firstName field
      lastName?: string;
      phone?: string;
      address?: string;
      avatar?: string;
    },
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }
}
