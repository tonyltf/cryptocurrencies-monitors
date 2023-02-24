import { AxiosResponse } from 'axios';
import { ITicker, ITickerReponse, ITickerResult } from './ticker.inteface';

export interface IKrakenReponse {
  result: {
    [pair: string]: {
      a: string[];
      b: string[];
      c: string[];
      v: string[];
      p: string[];
      t: number[];
      l: string[];
      h: string[];
      o: string;
    };
  };
}

export class Kraken implements ITicker {
  name = 'Kraken';
  apiPath: string;
  constructor() {
    this.apiPath = 'https://api.kraken.com/0/public/Ticker?pair={pair}';
  }
  getName() {
    return this.name;
  }

  getCurrencyList() {
    return {
      Bitcoin: 'BTCUSD',
      Ether: 'ETHUSD',
      Litecoin: 'LTCUSD',
      Monero: 'XMRUSD',
      Ripple: 'XRPUSD',
      Dogecoin: 'DOGEUSD',
      Dash: 'DASHUSD',
      Lisk: 'LSKUSD',
    };
  }

  callApi: () => Promise<AxiosResponse<IKrakenReponse, any>>;

  transform(response: IKrakenReponse): ITickerResult {
    let result: {
      a: string[];
      b: string[];
      c: string[];
      v: string[];
      p: string[];
      t: number[];
      l: string[];
      h: string[];
      o: string;
    };
    for (const key in response.result) {
      result = response.result[key];
    }
    return {
      price: parseFloat(result['c'][0]),
      volume: parseFloat(result['v'][0]),
      change: undefined,
    };
  }
}
