import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { tickerProvider } from './app.module';

describe('AppController', () => {
  let appController: AppController;
  let bitcoinPair: string;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), HttpModule],
      controllers: [AppController],
      providers: [AppService, tickerProvider],
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

    it('should return the list of available currency', () => {
      const list = appController.getCurrencyList();
      bitcoinPair = list?.Bitcoin;
      expect(list).toBeDefined();
      expect(bitcoinPair).toBeDefined();
    });

    it('should return price info of Bitcoin', () => {
      expect(appController.getPrice(bitcoinPair)).toBeDefined();
    });
  });
});
