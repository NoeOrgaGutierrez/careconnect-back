import { DataSource, Repository } from 'typeorm'
import { Pin } from './entities/pin.entity'

export const pinProviders = [
  {
    provide: 'PIN_REPOSITORY',
    useFactory: (dataSource: DataSource): Repository<Pin> =>
      dataSource.getRepository(Pin),
    inject: ['DATA_SOURCE']
  }
]
