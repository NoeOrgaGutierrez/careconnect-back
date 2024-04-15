import { DataSource, Repository } from 'typeorm'

export const eventProviders = [
  {
    provide: 'EVENT_REPOSITORY',
    useFactory: (dataSource: DataSource): Repository<Event> =>
      dataSource.getRepository(Event),
    inject: ['DATA_SOURCE']
  }
]
