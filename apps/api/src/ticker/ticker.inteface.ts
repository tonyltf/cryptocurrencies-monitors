import { AxiosResponse } from 'axios';
import { ICryptonatorReponse } from './cryptonator';
import { IKrakenReponse } from './kraken';

export type ITickerReponse = ICryptonatorReponse | IKrakenReponse;
export interface ITickerResult {
  price: number;
  volume: number;
  change: number;
}

export interface ICurrencyList {
  [code: string]: string;
}

export interface ITicker {
  name: string;
  apiPath: string;
  getName: () => string;
  getCurrencyList: () => ICurrencyList;
  callApi: () => Promise<AxiosResponse<ITickerReponse>>;
  transform: (response: ITickerReponse) => ITickerResult;
}
