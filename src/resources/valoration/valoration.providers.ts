import { DataSource, Repository } from 'typeorm'
import { Valoration } from './entities/valoration.entity'

export const valorationProviders = [
  {
    provide: 'VALORATION_REPOSITORY',
    useFactory: (dataSource: DataSource): Repository<Valoration> =>
      dataSource.getRepository(Valoration),
    inject: ['DATA_SOURCE']
  }
]
