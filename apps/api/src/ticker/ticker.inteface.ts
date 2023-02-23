export interface ITickerReponse {
  ticker: {
    base: string;
    targer: string;
    price: string;
    volume: string;
    change: string;
  };
  timestamp: number;
  success: boolean;
  error: string;
}

export default interface ITicker {
  apiPath: string;
  model: object;

  getPrice(): TickerReponse;
}
