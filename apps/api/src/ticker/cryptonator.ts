import { AxiosResponse } from 'axios';
import { ICurrencyList, ITicker, ITickerResult } from './ticker.inteface';

export interface ICryptonatorReponse {
  ticker: {
    base: string;
    target: string;
    price: string;
    volume: string;
    change: string;
  };
  timestamp: number;
  success: boolean;
  error: string;
}

export class Cryptonator implements ITicker {
  name = 'Cryptonator';
  apiPath: string;
  constructor() {
    this.apiPath = 'https://api.cryptonator.com/api/ticker/{pair}';
  }
  getName() {
    return this.name;
  }
  getCurrencyList(): ICurrencyList {
    return {
      Bitcoin: 'btc-usd',
      Ether: 'eth-usd',
      Litecoin: 'ltc-usd',
      Monero: 'xmr-usd',
      Ripple: 'xrp-usd',
      Dogecoin: 'doge-usd',
      Dash: 'dash-usd',
      MaidSafeeCoin: 'maid-usd',
      Lisk: 'lsk-usd',
      'Storjcoin X': 'sjcx-usd',
    };
  }
  callApi: () => Promise<AxiosResponse<ICryptonatorReponse, any>>;
  transform: (response: ICryptonatorReponse) => ITickerResult;
}
