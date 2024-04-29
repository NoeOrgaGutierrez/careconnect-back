import { Module } from '@nestjs/common'
import { AssignmentService } from './assignment.service'
import { AssignmentController } from './assignment.controller'
import { DatabaseModule } from 'src/database/database.module'
import { assignmentProviders } from './assignment.providers'

@Module({
  imports: [DatabaseModule],
  controllers: [AssignmentController],
  providers: [AssignmentService, ...assignmentProviders]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AssignmentModule {}
