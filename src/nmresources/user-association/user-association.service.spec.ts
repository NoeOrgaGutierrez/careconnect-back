import { Test, TestingModule } from '@nestjs/testing';
import { UserAssociationService } from './user-association.service';

describe('UserAssociationService', () => {
  let service: UserAssociationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAssociationService],
    }).compile();

    service = module.get<UserAssociationService>(UserAssociationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
