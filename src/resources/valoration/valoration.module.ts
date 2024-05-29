import { Module } from '@nestjs/common'
import { ValorationService } from './valoration.service'
import { ValorationController } from './valoration.controller'
import { DatabaseModule } from 'src/database/database.module'
import { valorationProviders } from './valoration.providers'

@Module({
  imports: [DatabaseModule],
  controllers: [ValorationController],
  providers: [ValorationService, ...valorationProviders]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ValorationModule {}
