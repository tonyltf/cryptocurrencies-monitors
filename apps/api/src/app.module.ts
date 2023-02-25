import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { TickerService } from './ticker/ticker.service';

export const tickerProvider = {
  provide: TickerService,
  useFactory: (httpService: HttpService, config: ConfigService) => {
    const ticker = config.get('TICKER_SOURCE');
    return new TickerService(httpService, ticker);
  },
  inject: [HttpService, ConfigService],
};

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, CacheModule.register()],
  controllers: [AppController],
  providers: [AppService, tickerProvider],
})
export class AppModule {}
