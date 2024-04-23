import { DataSource, Repository } from 'typeorm'
import { Topic } from './entities/topic.entity'

export const topicProviders = [
  {
    provide: 'TOPIC_REPOSITORY',
    useFactory: (dataSource: DataSource): Repository<Topic> =>
      dataSource.getRepository(Topic),
    inject: ['DATA_SOURCE']
  }
]
