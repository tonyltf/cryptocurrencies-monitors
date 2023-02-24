import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { TickerService } from './ticker/ticker.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly tickerProvider: TickerService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/ticker')
  getTickerName(): string {
    return this.tickerProvider.getTickerName();
  }
}
