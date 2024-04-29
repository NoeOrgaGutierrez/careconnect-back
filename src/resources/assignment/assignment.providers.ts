import { DataSource, Repository } from 'typeorm'
import { Assignment } from './entities/assignment.entity'

export const assignmentProviders = [
  {
    provide: 'ASSIGNMENT_REPOSITORY',
    useFactory: (dataSource: DataSource): Repository<Assignment> =>
      dataSource.getRepository(Assignment),
    inject: ['DATA_SOURCE']
  }
]
