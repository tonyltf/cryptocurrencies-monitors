import { AxiosResponse } from 'axios';

export interface ITickerReponse {
  base: string;
  target: string;
  price: string;
  volume: string;
  change: string;
}

export interface ITicker {
  name: string;
  apiPath: string;
  getName: () => string;
  callApi: () => Promise<AxiosResponse<ITickerReponse>>;
}
