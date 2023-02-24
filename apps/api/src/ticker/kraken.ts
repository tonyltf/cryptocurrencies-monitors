import { AxiosResponse } from 'axios';
import { ITicker, ITickerReponse } from './ticker.inteface';

export class Kraken implements ITicker {
  name = 'Kraken';
  apiPath: string;
  constructor() {
    this.apiPath = 'https://api.kraken.com/0/public/Ticker?pair={BASE}{TARGET}';
  }
  getName() {
    return this.name;
  }
  callApi: () => Promise<AxiosResponse<ITickerReponse, any>>;
}
