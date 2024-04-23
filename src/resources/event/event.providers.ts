import { DataSource, Repository } from 'typeorm'
import { Evento } from './entities/event.entity'
export const eventProviders = [
  {
    provide: 'EVENT_REPOSITORY',
    useFactory: (dataSource: DataSource): Repository<Evento> =>
      dataSource.getRepository(Evento),
    inject: ['DATA_SOURCE']
  }
]
