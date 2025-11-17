import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto, LogoutDto } from './dto/login.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { RefreshTokenDto, ResponseTokenDto } from './dto/refresh.token.dto';
import { ApiAutoResponse } from 'src/decorators/api-auto-response.decorator';

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiAutoResponse(ResponseTokenDto)
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @ApiAutoResponse(ResponseTokenDto)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiAutoResponse(ResponseTokenDto)
  @Post('refresh')
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refresh(refreshTokenDto);
  }

  @ApiAutoResponse(LogoutDto)
  @Post('logout')
  async logout(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.logout(refreshTokenDto);
  }
}
