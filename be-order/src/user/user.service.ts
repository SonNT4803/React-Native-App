import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from 'src/auth/dto/user.dto';
import { Role } from 'src/entities/role.entity';
import { UserRole } from 'src/entities/user.role.entity';
import { User } from 'src/entities/users.entity';
import { UserRoleService } from 'src/user-role/user-role.service';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
    private readonly userRoleService: UserRoleService,
  ) {}

  async findAll(): Promise<UserDTO[]> {
    const users = await this.userRepository.find();
    const data: UserDTO[] = await Promise.all(
      users.map(async (user) => {
        const userRoles = await this.userRoleService.findUserRoleById(user.id);
        const roles = userRoles.map((userRole) => userRole.role.name);
        return { id: user.id, email: user.email, role: roles };
      }),
    );

    return data;
  }

  async createUser(
    email: string,
    password: string,
    roleId: number,
  ): Promise<User> {
    // Tìm xem role có tồn tại không
    const role = await this.roleRepository.findOne({
      where: { id: roleId },
    });

    if (!role) {
      throw new Error(`Role with ID ${roleId} does not exist`);
    }

    const user = this.userRepository.create({
      email: email,
      password,
    });
    const savedUser = await this.userRepository.save(user);

    const userRole = this.userRoleRepository.create({
      user: savedUser,
      role: role,
    });

    await this.userRoleRepository.save(userRole);

    return savedUser;
  }

  async findUserById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email: email },
    });
  }
}
