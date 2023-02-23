import { HttpService } from '@nestjs/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { Injectable } from '@nestjs/common';
import { ITickerReponse } from './ticker.inteface';

@Injectable()
export class TickerService {
  private apiPath: string = process.env.API_PATH;
  constructor(private readonly httpService: HttpService) {}

  async callApi(): Promise<AxiosResponse<ITickerReponse>> {
    console.log(this.apiPath);
    try {
      const response = await this.httpService.axiosRef.get<ITickerReponse>(
        this.apiPath,
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
