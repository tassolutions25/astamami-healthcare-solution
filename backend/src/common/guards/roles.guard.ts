import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator.js';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      throw new ForbiddenException('Access denied: unauthenticated');
    }

    // Support both user.roles as string[] or user.roles as [{ role: { name: string } }] or [{ role: string }]
    const userRoleNames: string[] = (user.roles || []).map((r: any) =>
      typeof r === 'string' ? r : r.role?.name || r.name || r.role,
    );

    const hasRole = requiredRoles.some((role) => userRoleNames.includes(role));
    if (!hasRole) {
      throw new ForbiddenException(
        `Access denied: required role(s): [${requiredRoles.join(', ')}]`,
      );
    }

    return true;
  }
}
