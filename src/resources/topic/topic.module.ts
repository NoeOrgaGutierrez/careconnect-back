import { Module } from '@nestjs/common'
import { TopicService } from './topic.service'
import { TopicController } from './topic.controller'
import { DatabaseModule } from 'src/database/database.module'
import { topicProviders } from './topic.providers'

@Module({
  imports: [DatabaseModule],
  controllers: [TopicController],
  providers: [TopicService, ...topicProviders]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class TopicModule {}
