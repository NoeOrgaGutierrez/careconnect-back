import { Module } from '@nestjs/common'
import { AssignmentPermissionService } from './assignment-permission.service'
import { AssignmentPermissionController } from './assignment-permission.controller'
import { assignmentPermissionProviders } from './assignment-permission.providers'
import { DatabaseModule } from 'src/database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [AssignmentPermissionController],
  providers: [AssignmentPermissionService, ...assignmentPermissionProviders]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AssignmentPermissionModule {}
