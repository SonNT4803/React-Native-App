import { Controller, Get } from '@nestjs/common';
import { UserDTO } from 'src/auth/dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAllUsers(): Promise<UserDTO[]> {
    return this.userService.findAll();
  }
}
