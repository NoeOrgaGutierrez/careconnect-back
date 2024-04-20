import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
@ApiTags('App Test')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @ApiOperation({ summary: 'Test App' })
  @Get()
  getHello(): string {
    return 'Server working'
  }
}
