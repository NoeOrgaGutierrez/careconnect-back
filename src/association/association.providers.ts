import { DataSource, Repository } from 'typeorm'
import { Association } from './entities/association.entity'

export const AssociationProviders = [
  {
    provide: 'ASSOCIATION_REPOSITORY',
    useFactory: (dataSource: DataSource): Repository<Association> =>
      dataSource.getRepository(Association),
    inject: ['DATA_SOURCE'] // Directly inject the 'DATA_SOURCE' token
  }
]
