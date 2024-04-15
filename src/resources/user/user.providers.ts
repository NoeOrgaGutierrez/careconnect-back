import { DataSource, Repository } from 'typeorm'
import { User } from './entities/user.entity'

export const UserProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource): Repository<User> =>
      dataSource.getRepository(User),
    inject: ['DATA_SOURCE']
  }
]
