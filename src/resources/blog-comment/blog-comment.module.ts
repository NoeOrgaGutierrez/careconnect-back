import { Module } from '@nestjs/common'
import { BlogCommentService } from './blog-comment.service'
import { BlogCommentController } from './blog-comment.controller'
import { DatabaseModule } from 'src/database/database.module'
import { blogCommentProviders } from './blog-comment.providers'

@Module({
  imports: [DatabaseModule],
  controllers: [BlogCommentController],
  providers: [BlogCommentService, ...blogCommentProviders]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class BlogCommentModule {}
