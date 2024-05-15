import { DataSource, Repository } from 'typeorm'
import { BlogComment } from './entities/blog-comment.entity'

export const blogCommentProviders = [
  {
    provide: 'BLOG_COMMENT_REPOSITORY',
    useFactory: (dataSource: DataSource): Repository<BlogComment> =>
      dataSource.getRepository(BlogComment),
    inject: ['DATA_SOURCE']
  }
]
