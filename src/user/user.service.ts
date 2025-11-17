import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserByEmail(email: string) {
    return this.prismaService.user.findFirst({ where: { email } });
  }

  async getUserById(id: string) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  async register(registerDto: RegisterDto, prisma?: PrismaClient) {
    const db = prisma ?? this.prismaService;
    return db.user.create({ data: registerDto });
  }

  // Store hashed refresh token
  async setRefreshToken(userId: string, token: string) {
    return this.prismaService.token.create({
      data: {
        token,
        userId,
      },
    });
  }

  // Remove refresh token
  async removeRefreshToken(token: string) {
    return this.prismaService.token.deleteMany({
      where: { token },
    });
  }

  // Find token
  async findRefreshToken(token: string) {
    return this.prismaService.token.findUnique({ where: { token } });
  }
}
