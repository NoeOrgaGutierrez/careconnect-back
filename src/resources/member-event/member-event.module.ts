import { Module } from '@nestjs/common'
import { MemberEventService } from './member-event.service'
import { MemberEventController } from './member-event.controller'
import { DatabaseModule } from 'src/database/database.module'
import { memberEventProviders } from './member-event.providers'

@Module({
  imports: [DatabaseModule],
  controllers: [MemberEventController],
  providers: [MemberEventService, ...memberEventProviders]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MemberEventModule {}
