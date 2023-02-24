import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TickerService } from './ticker/ticker.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), HttpModule],
      controllers: [AppController],
      providers: [
        AppService,
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

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
    it('should return the ticker name', () => {
      expect(appController.getTickerName()).toBeDefined();
    });
  });
});
