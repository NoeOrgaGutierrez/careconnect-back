import { Test, TestingModule } from '@nestjs/testing'
import { UserAssociationController } from './user-association.controller'
import { UserAssociationService } from './user-association.service'

describe('UserAssociationController', () => {
  let controller: UserAssociationController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAssociationController],
      providers: [UserAssociationService]
    }).compile()

    controller = module.get<UserAssociationController>(
      UserAssociationController
    )
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
