import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async getUserByEmail(email: string) {
    const user = this.prismaService.user.findFirst({ where: { email } });
    return user;
  }
}
