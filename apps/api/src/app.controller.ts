import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { TickerService } from './ticker/ticker.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly tickerService: TickerService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/ticker')
  getTickerName(): string {
    return this.tickerService.getTickerName();
  }

  @Get('/list')
  getCurrencyList(): { [key: string]: string } {
    return this.tickerService.getCurrencyList();
  }

  @Get('/price/:pair')
  async getPrice(@Param('pair') pair: string): Promise<any> {
    return this.tickerService.getPrice(pair);
  }
}
