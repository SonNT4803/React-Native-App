// src/auth/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Nếu endpoint không yêu cầu role cụ thể thì cho phép truy cập
    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    // Kiểm tra xem user có tồn tại và có role không
    if (!user || !user.role) {
      return false;
    }

    // Chỉ cần user có ít nhất một role trong requiredRoles là được
    return requiredRoles.some((requiredRole) =>
      user.role.some((userRole) => userRole === requiredRole),
    );
  }
}
