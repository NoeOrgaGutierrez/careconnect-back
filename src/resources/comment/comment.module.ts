import { Module } from '@nestjs/common'
import { CommentService } from './comment.service'
import { CommentController } from './comment.controller'
import { DatabaseModule } from 'src/database/database.module'
import { commentProviders } from './comment.providers'

@Module({
  imports: [DatabaseModule],
  controllers: [CommentController],
  providers: [CommentService, ...commentProviders]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class CommentModule {}
