import { Injectable, Logger } from '@nestjs/common';
import { env } from 'process';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  getHello(): string {
    this.logger.log(`Get the home api`);
    return 'Wecome to light notes api';
  }
}
