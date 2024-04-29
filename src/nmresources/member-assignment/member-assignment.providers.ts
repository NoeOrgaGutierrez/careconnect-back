import { DataSource, Repository } from 'typeorm'
import { MemberAssignment } from './entities/member-assignment.entity'

export const memberAssignmentProviders = [
  {
    provide: 'MEMBER_ASSIGNMENT_REPOSITORY',
    useFactory: (dataSource: DataSource): Repository<MemberAssignment> =>
      dataSource.getRepository(MemberAssignment),
    inject: ['DATA_SOURCE']
  }
]
