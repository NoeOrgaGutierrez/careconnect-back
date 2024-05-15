import { DataSource, Repository } from 'typeorm'
import { Blog } from './entities/blog.entity'

export const blogProviders = [
  {
    provide: 'BLOG_REPOSITORY',
    useFactory: (dataSource: DataSource): Repository<Blog> =>
      dataSource.getRepository(Blog),
    inject: ['DATA_SOURCE']
  }
]
