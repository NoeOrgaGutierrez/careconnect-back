import { Module } from '@nestjs/common'
import { PinService } from './pin.service'
import { PinController } from './pin.controller'
import { DatabaseModule } from 'src/database/database.module'
import { pinProviders } from './pin.providers'

@Module({
  imports: [DatabaseModule],
  controllers: [PinController],
  providers: [PinService, ...pinProviders]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class PinModule {}
