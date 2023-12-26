import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from '../health.controller';
import { HealthService } from '../health.service';

describe('HealthController', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const health: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService, { provide: CACHE_MANAGER, useValue: {} }],
    }).compile();

    healthController = health.get<HealthController>(HealthController);
  });

  describe('root', () => {
    it('should return status="OK"', () => {
      expect(healthController.getHealth()).toEqual({ status: 'OK' });
    });
  });
});
