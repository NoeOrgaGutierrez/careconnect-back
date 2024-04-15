import { Test, TestingModule } from '@nestjs/testing'
import { MemberEventService } from './member-event.service'

describe('MemberEventService', () => {
  let service: MemberEventService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemberEventService]
    }).compile()

    service = module.get<MemberEventService>(MemberEventService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
