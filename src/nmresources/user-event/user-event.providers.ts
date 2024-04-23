import { DataSource, Repository } from 'typeorm'
import { UserEvent } from './entities/user-event.entity'

export const userEventProviders = [
  {
    provide: 'USER_EVENT_REPOSITORY',
    useFactory: (dataSource: DataSource): Repository<UserEvent> =>
      dataSource.getRepository(UserEvent),
    inject: ['DATA_SOURCE']
  }
]
