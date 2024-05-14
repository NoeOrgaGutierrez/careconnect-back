import { Test, TestingModule } from '@nestjs/testing'
import { AssignmentPermissionController } from './assignment-permission.controller'
import { AssignmentPermissionService } from './assignment-permission.service'

describe('AssignmentPermissionController', () => {
  let controller: AssignmentPermissionController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignmentPermissionController],
      providers: [AssignmentPermissionService]
    }).compile()

    controller = module.get<AssignmentPermissionController>(
      AssignmentPermissionController
    )
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
