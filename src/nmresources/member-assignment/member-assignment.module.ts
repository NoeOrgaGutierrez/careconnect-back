import { Module } from '@nestjs/common'
import { MemberAssignmentService } from './member-assignment.service'
import { MemberAssignmentController } from './member-assignment.controller'
import { DatabaseModule } from 'src/database/database.module'
import { memberAssignmentProviders } from './member-assignment.providers'

@Module({
  imports: [DatabaseModule],
  controllers: [MemberAssignmentController],
  providers: [MemberAssignmentService, ...memberAssignmentProviders]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MemberAssignmentModule {}
