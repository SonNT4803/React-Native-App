import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/entities/role.entity';
@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async seedRoles() {
    try {
      // Kiểm tra xem role Admin đã tồn tại chưa
      const adminRole = await this.roleRepository.findOne({
        where: { name: 'Admin' },
      });

      // Nếu chưa có role Admin thì tạo mới
      if (!adminRole) {
        const role = this.roleRepository.create({ name: 'Admin' });
        await this.roleRepository.save(role);
        console.log('✅ Admin role created successfully');
      } else {
        console.log('👌 Admin role already exists');
      }
    } catch (error) {
      console.error('Error while seeding roles:', error);
    }
  }
}
