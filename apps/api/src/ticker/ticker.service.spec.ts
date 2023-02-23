import { Test, TestingModule } from '@nestjs/testing';
import { TickerService } from './ticker.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('TickerService', () => {
  let service: TickerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), HttpModule],
      providers: [TickerService],
    }).compile();

    service = module.get<TickerService>(TickerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call an API', async () => {
    const response = await service.callApi();
    expect(response.status).toEqual(200);
  });
});
