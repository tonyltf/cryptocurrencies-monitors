import { AxiosResponse } from 'axios';
import { ITicker, ITickerReponse } from './ticker.inteface';

export class Cryptonator implements ITicker {
  name = 'Cryptonator';
  apiPath: string;
  constructor() {
    this.apiPath = 'https://api.cryptonator.com/api/ticker/{base}-{target}';
  }
  getName() {
    return this.name;
  }
  callApi: () => Promise<AxiosResponse<ITickerReponse, any>>;
}
