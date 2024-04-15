import { Module } from '@nestjs/common'
import { EventService } from './event.service'
import { EventController } from './event.controller'
import { DatabaseModule } from 'src/database/database.module'
import { eventProviders } from './event.providers'

@Module({
  imports: [DatabaseModule],
  controllers: [EventController],
  providers: [EventService, ...eventProviders]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class EventModule {}
