import { DataSource, Repository } from 'typeorm'
import { AssignmentPermission } from './entities/assignment-permission.entity'

export const assignmentPermissionProviders = [
  {
    provide: 'ASSIGNMENT_PERMISSION_REPOSITORY',
    useFactory: (dataSource: DataSource): Repository<AssignmentPermission> =>
      dataSource.getRepository(AssignmentPermission),
    inject: ['DATA_SOURCE']
  }
]
