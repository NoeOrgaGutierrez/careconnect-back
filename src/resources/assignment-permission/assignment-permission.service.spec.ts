import { Test, TestingModule } from '@nestjs/testing'
import { AssignmentPermissionService } from './assignment-permission.service'

describe('AssignmentPermissionService', () => {
  let service: AssignmentPermissionService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignmentPermissionService]
    }).compile()

    service = module.get<AssignmentPermissionService>(
      AssignmentPermissionService
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
