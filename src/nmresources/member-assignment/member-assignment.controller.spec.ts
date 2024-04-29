import { Test, TestingModule } from '@nestjs/testing'
import { MemberAssignmentController } from './member-assignment.controller'
import { MemberAssignmentService } from './member-assignment.service'

describe('MemberAssignmentController', () => {
  let controller: MemberAssignmentController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberAssignmentController],
      providers: [MemberAssignmentService]
    }).compile()

    controller = module.get<MemberAssignmentController>(
      MemberAssignmentController
    )
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
