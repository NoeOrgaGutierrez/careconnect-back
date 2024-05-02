import { DataSource, Repository } from 'typeorm'
import { UserAssociation } from './entities/user-association.entity'

export const userAssociationProviders = [
  {
    provide: 'USER_ASSOCIATION_REPOSITORY',
    useFactory: (dataSource: DataSource): Repository<UserAssociation> =>
      dataSource.getRepository(UserAssociation),
    inject: ['DATA_SOURCE']
  }
]
