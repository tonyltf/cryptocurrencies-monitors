import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { Injectable } from '@nestjs/common';
import { ITickerReponse, ITickerResult } from './ticker.inteface';
import { ITicker } from './ticker.inteface';
import { TICKER_PROVIDER } from './ticker.constant';
import { Cryptonator } from './cryptonator';
import { Kraken } from './kraken';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { CacheService } from 'src/lib/cache.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TickerService {
  private ticker: ITicker;
  private apiPath: string;

  constructor(
    ticker: string,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly cacheService: CacheService,
  ) {
    if (ticker === TICKER_PROVIDER.CRYPTONATOR) {
      this.ticker = new Cryptonator();
    }
    if (ticker === TICKER_PROVIDER.KRAKEN) {
      this.ticker = new Kraken();
    }
    if (!this.ticker) throw new Error('Ticker not defined');
  }

  getTickerName() {
    return this.ticker?.getName();
  }

  getCurrencyList() {
    return this.ticker?.getCurrencyList();
  }

  async getPrice(pair: string): Promise<ITickerResult> {
    if (!this.ticker) {
      return { price: undefined, change: undefined, volume: undefined };
    }
    try {
      // TODO: Try to read from cache
      const cachedResponse = await this.cacheService.get<Buffer>(pair);
      console.log({ cachedResponse });
      if (!cachedResponse) {
        const apiPath = this.ticker?.apiPath?.replace('{pair}', pair) || '';
        const response = (
          await this.httpService.axiosRef.get<ITickerReponse>(apiPath)
        ).data;
        // TODO: Cache price
        await this.cacheService.set(
          pair,
          Buffer.from(JSON.stringify(response)),
          this.configService.get('TICKER_SOURCE_TTL'),
        );
        return this.ticker.transform(response);
      } else {
        return this.ticker.transform(JSON.parse(cachedResponse.toString()));
      }
    } catch (e) {
      const error = <AxiosError>e;
      if (error.status === 403) {
        console.error('Please may sure your IP address is not being blocked');
      }
      throw new Error(e);
    }
  }
}
