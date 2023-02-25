import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { TickerService } from './ticker/ticker.service';
import { CacheService } from './lib/cache.service';
import { CacheModule } from './lib/cache.module';

export const tickerProvider = {
  provide: TickerService,
  useFactory: (
    configService: ConfigService,
    httpService: HttpService,
    cacheService: CacheService,
  ) => {
    const ticker = configService.get('TICKER_SOURCE');
    return new TickerService(ticker, configService, httpService, cacheService);
  },
  inject: [ConfigService, HttpService, CacheService],
};

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, CacheModule],
  controllers: [AppController],
  providers: [AppService, tickerProvider],
})
export class AppModule {}
