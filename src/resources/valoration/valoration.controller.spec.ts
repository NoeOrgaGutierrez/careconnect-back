import { Test, TestingModule } from '@nestjs/testing'
import { ValorationController } from './valoration.controller'
import { ValorationService } from './valoration.service'

describe('ValorationController', () => {
  let controller: ValorationController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValorationController],
      providers: [ValorationService]
    }).compile()

    controller = module.get<ValorationController>(ValorationController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
