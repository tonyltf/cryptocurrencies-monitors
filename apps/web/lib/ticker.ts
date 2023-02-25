/* eslint-disable turbo/no-undeclared-env-vars */
export async function getPrice (pair: string): Promise<TickerResponse> {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  console.log(`${process.env.API_PATH}/price/${pair}`);
  const res = await fetch(`${process.env.API_PATH}/price/${pair}`);
  return res.json();
}

export interface TickerResponse {
  price?: number;
  volume?: number;
  change?: number;
}

export interface CurrencyInfo {
  name: string;
  pair: string;
}

export type CurrencyCard = TickerResponse & CurrencyInfo;
