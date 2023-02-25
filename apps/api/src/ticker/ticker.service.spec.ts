import { Test, TestingModule } from '@nestjs/testing';
import { TickerService } from './ticker.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('TickerService', () => {
  let service: TickerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), HttpModule],
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

    service = module.get<TickerService>(TickerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have a ticker name', () => {
    expect(service.getTickerName()).toBeDefined();
  });

  it('should call an API', async () => {
    const response = await service.getPrice('BTCUSD');
    expect(response?.price).toBeGreaterThan(0);
  });
});
