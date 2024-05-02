import { Test, TestingModule } from '@nestjs/testing'
import { MemberAssignmentService } from './member-assignment.service'

describe('MemberAssignmentService', () => {
  let service: MemberAssignmentService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemberAssignmentService]
    }).compile()

    service = module.get<MemberAssignmentService>(MemberAssignmentService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
