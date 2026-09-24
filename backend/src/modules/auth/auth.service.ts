import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../common/prisma/prisma.service.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (existing) {
      throw new ConflictException('An account with this email already exists');
    }

    const saltRounds = this.configService.get<number>('bcryptRounds') || 10;
    const passwordHash = await bcrypt.hash(dto.password, saltRounds);

    const targetRoleName = dto.role === 'CAREGIVER' ? 'CAREGIVER' : 'CLIENT';

    // Find or create role
    let role = await this.prisma.role.findUnique({
      where: { name: targetRoleName },
    });

    if (!role) {
      role = await this.prisma.role.create({
        data: {
          name: targetRoleName,
          description: `${targetRoleName} role in Astamami platform`,
        },
      });
    }

    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toLowerCase(),
        passwordHash,
        phone: dto.phone,
        roles: {
          create: {
            roleId: role.id,
          },
        },
        ...(targetRoleName === 'CLIENT'
          ? {
              client: {
                create: {
                  fullName: dto.fullName,
                  phone: dto.phone,
                  email: dto.email.toLowerCase(),
                },
              },
            }
          : {
              caregiver: {
                create: {
                  fullName: dto.fullName,
                  phone: dto.phone,
                  email: dto.email.toLowerCase(),
                  professionalRole: 'Caregiver',
                },
              },
            }),
      },
      include: {
        roles: {
          include: { role: true },
        },
        client: true,
        caregiver: true,
      },
    });

    const tokens = await this.generateTokens(user.id, user.email, [targetRoleName]);

    return {
      message: 'Account successfully registered',
      user: {
        id: user.id,
        email: user.email,
        roles: [targetRoleName],
        client: (user as any).client,
        caregiver: (user as any).caregiver,
      },
      tokens,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
      include: {
        roles: {
          include: { role: true },
        },
        client: true,
        caregiver: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Your account has been deactivated. Please contact support.');
    }

    const roles = user.roles.map((r: any) => r.role.name);
    const tokens = await this.generateTokens(user.id, user.email, roles);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    return {
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        roles,
        client: user.client,
        caregiver: user.caregiver,
      },
      tokens,
    };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        roles: {
          include: { role: true },
        },
        client: true,
        caregiver: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      phone: user.phone,
      roles: user.roles.map((r: any) => r.role.name),
      client: user.client,
      caregiver: user.caregiver,
      createdAt: user.createdAt,
    };
  }

  private async generateTokens(userId: string, email: string, roles: string[]) {
    const payload = { sub: userId, email, roles };
    const accessSecret = this.configService.get<string>('jwt.accessSecret') || 'astamami_dev_access_secret_key_1234567890';
    const accessExpiresIn = this.configService.get<string>('jwt.accessExpiresIn') || '15m';

    const accessToken = this.jwtService.sign(payload, {
      secret: accessSecret,
      expiresIn: accessExpiresIn as any,
    });

    return {
      accessToken,
      tokenType: 'Bearer',
      expiresIn: accessExpiresIn,
    };
  }
}
