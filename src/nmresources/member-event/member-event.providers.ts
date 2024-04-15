import { DataSource, Repository } from 'typeorm'
import { MemberEvent } from './entities/member-event.entity'

export const memberEventProviders = [
  {
    provide: 'MEMBER_EVENT_REPOSITORY',
    useFactory: (dataSource: DataSource): Repository<MemberEvent> =>
      dataSource.getRepository(MemberEvent),
    inject: ['DATA_SOURCE']
  }
]
