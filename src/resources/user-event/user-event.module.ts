import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/database/database.module'
import { userEventProviders } from './user-event.providers'
import { UserEventController } from './user-event.controller'
import { UserEventService } from './user-event.service'

@Module({
  imports: [DatabaseModule],
  controllers: [UserEventController],
  providers: [UserEventService, ...userEventProviders]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class DayModule {}
