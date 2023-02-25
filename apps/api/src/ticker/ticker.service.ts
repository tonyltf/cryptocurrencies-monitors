import { HttpService } from '@nestjs/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { Injectable } from '@nestjs/common';
import { ITickerReponse } from './ticker.inteface';
import { Cryptonator } from './cryptonator';
import { ITicker } from './ticker.inteface';
import { TICKER_PROVIDER } from './ticker.constant';
import { Kraken } from './kraken';

@Injectable()
export class TickerService {
  private ticker: ITicker;
  private apiPath: string;

  constructor(private readonly httpService: HttpService, ticker: string) {
    if (ticker === TICKER_PROVIDER.CRYPTONATOR) {
      this.ticker = new Cryptonator();
    }
    if (ticker === TICKER_PROVIDER.KRAKEN) {
      this.ticker = new Kraken();
    }
  }

  getTickerName() {
    return this.ticker?.getName();
  }

  getCurrencyList() {
    return this.ticker?.getCurrencyList();
  }

  async getPrice(pair: string): Promise<AxiosResponse<ITickerReponse>> {
    try {
      console.log(this.ticker?.apiPath);
      const apiPath = this.ticker?.apiPath?.replace('{pair}', pair) || '';
      const response = await this.httpService.axiosRef.get<ITickerReponse>(
        apiPath,
      );
      return response;
    } catch (e) {
      const error = <AxiosError>e;
      if (error.status === 403) {
        console.error('Please may sure your IP address is not being blocked');
      }
      throw new Error(e);
    }
  }
}