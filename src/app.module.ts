import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from './database/database.module'
import { AssociationModule } from './resources/association/association.module'
import { UserModule } from './resources/user/user.module'
import { EventModule } from './resources/event/event.module'
import { CommentModule } from './resources/comment/comment.module'
import { TopicModule } from './resources/topic/topic.module'
import { PublicationModule } from './resources/publication/publication.module'
import { ConfigModule } from '@nestjs/config'
import { MemberEventModule } from './resources/member-event/member-event.module'
import { UserAssociationModule } from './resources/user-association/user-association.module'
import { BlogModule } from './resources/blog/blog.module'
import { BlogCommentModule } from './resources/blog-comment/blog-comment.module'
import { StorageModule } from './utils/storage/storage.module'
import { FaqModule } from './resources/faq/faq.module'
import { PinModule } from './resources/pin/pin.module'
import { ValorationModule } from './resources/valoration/valoration.module'

@Module({
  imports: [
    AssociationModule,
    DatabaseModule,
    UserModule,
    MemberEventModule,
    UserAssociationModule,
    EventModule,
    TopicModule,
    CommentModule,
    PublicationModule,
    ConfigModule.forRoot({}),
    BlogModule,
    BlogCommentModule,
    StorageModule,
    FaqModule,
    PinModule,
    ValorationModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppModule {}
