import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserByEmail(email: string) {
    return this.prismaService.user.findFirst({ where: { email } });
  }

  async register(registerDto: RegisterDto, prisma?: PrismaClient) {
    const db = prisma ?? this.prismaService;
    return db.user.create({ data: registerDto });
  }
}
