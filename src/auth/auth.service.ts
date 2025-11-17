import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  /**
   *  1. check the email already exists
   *  2. Hast the password using argon2
   *  3. Create the user
   *  4. Generate the JWT token with email and id
   *  5. Return the token
   */

  async register(registerDto: RegisterDto) {
    // 1️⃣ Check if email exists
    const existingUser = await this.userService.getUserByEmail(
      registerDto.email,
    );
    if (existingUser) throw new ConflictException('Email already taken');

    // 2️⃣ Hash password
    const hashedPassword = await argon2.hash(registerDto.password);

    try {
      // 3️⃣ Transaction to ensure atomicity
      const result = await this.prismaService.$transaction(
        async (prisma: PrismaClient) => {
          // Create user inside the transaction
          const user = await this.userService.register(
            { ...registerDto, password: hashedPassword },
            prisma,
          );

          // 4️⃣ Generate JWT
          const token = this.jwtService.sign({
            sub: user.id,
            email: user.email,
          });

          return { user, token };
        },
      );

      // 5️⃣ Return token
      return { token: result.token };
    } catch (error) {
      throw new InternalServerErrorException('Registration failed');
    }
  }

  async login(loginDto: LoginDto) {
    /**
     * 1. Get the user from db
     * 2. Match the password with hashed password
     * 3. Generate JWT token
     * 4. Return the token
     */

    const user = await this.userService.getUserByEmail(loginDto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    // 2️⃣ Verify password
    const isValid = await argon2.verify(user.password, loginDto.password);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    // 3️⃣ Generate JWT
    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    // 4️⃣ Return token
    return { token };
  }
}
