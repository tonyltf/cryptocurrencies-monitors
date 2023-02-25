import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Response } from 'supertest';
import { TICKER_PROVIDER } from './../src/ticker/ticker.constant';
import { TickerService } from './../src/ticker/ticker.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let bitcoinPair: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ConfigModule.forRoot(), HttpModule],
      providers: [
        {
          provide: TickerService,
          useFactory: (httpService: HttpService, config: ConfigService) => {
            const ticker = config.get('TICKER_SOURCE');
            return new TickerService(httpService, ticker);
          },
          inject: [HttpService, ConfigService],
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/ticker (GET)', () => {
    return request(app.getHttpServer())
      .get('/ticker')
      .expect(200)
      .expect((res: Response) => {
        return Object.keys(TICKER_PROVIDER).includes(res.body);
      });
  });

  it('/list (GET)', () => {
    return request(app.getHttpServer())
      .get('/list')
      .expect(200)
      .expect((res: Response) => {
        bitcoinPair = res.body?.Bitcoin;
        return !!bitcoinPair;
      });
  });

  it('/price/:pair (GET)', () => {
    return request(app.getHttpServer())
      .get(`/price/${bitcoinPair}`)
      .expect((res: Response) => {
        return !!res.body?.price;
      });
  });
});
