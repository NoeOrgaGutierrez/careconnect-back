import { Test, TestingModule } from '@nestjs/testing'
import { MemberEventController } from './member-event.controller'
import { MemberEventService } from './member-event.service'

describe('MemberEventController', () => {
  let controller: MemberEventController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberEventController],
      providers: [MemberEventService]
    }).compile()

    controller = module.get<MemberEventController>(MemberEventController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
