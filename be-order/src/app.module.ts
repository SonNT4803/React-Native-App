import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedModule } from './seeds/seed.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SeedService } from './seeds/seed.service';
import { CategoriesModule } from './categories/categories.module';
import { FoodModule } from './food/food.module';
import { OrdersModule } from './orders/orders.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'order_food',
      entities: [__dirname + '/entities/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    SeedModule,
    RoleModule,
    AuthModule,
    UserModule,
    CategoriesModule,
    FoodModule,
    OrdersModule,
  ],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly seedService: SeedService) {}

  async onApplicationBootstrap() {
    await this.seedService.seedRoles();
    console.log('✅ Seeding completed');
  }
}
