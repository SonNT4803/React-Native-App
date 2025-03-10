import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/users.entity';
import { UserRoleService } from 'src/user-role/user-role.service';
import { UserService } from '../user/user.service';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly userRoleService: UserRoleService,
  ) {}

  async validateUser(email: string, pass: string): Promise<UserDTO | null> {
    const user = await this.userService.findUserByEmail(email);

    if (user && (await bcrypt.compare(pass, user.password))) {
      const userRoles = await this.userRoleService.findUserRoleById(user.id);
      const roles = userRoles.map((userRole) => userRole.role.name);
      const userDTO: UserDTO = {
        id: user.id,
        email: user.email,
        role: roles,
      };
      return userDTO;
    }

    return null;
  }

  async login(userDTO: UserDTO) {
    const payload = {
      email: userDTO.email,
      sub: userDTO.id,
      role: userDTO.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(
    email: string,
    password: string,
    roleId: number,
  ): Promise<User> {
    const existingUser = await this.userService.findUserByEmail(email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userService.createUser(
      email,
      hashedPassword,
      roleId,
    );
    return user;
  }

  async generateTokens(payload: any) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: '5d', // access token ngắn hạn
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: '7d', // refresh token dài hạn
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken);
      // Tạo access token mới
      const newAccessToken = await this.jwtService.signAsync(payload);
      return { accessToken: newAccessToken };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
