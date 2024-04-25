import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from './database/database.module'
import { MemberEventModule } from './nmresources/member-event/member-event.module'
import { UserAssociationModule } from './nmresources/user-association/user-association.module'
import { AssociationModule } from './resources/association/association.module'
import { UserModule } from './resources/user/user.module'
import { EventModule } from './resources/event/event.module'
import { DayModule } from './nmresources/user-event/user-event.module'
import { CommentModule } from './resources/comment/comment.module'
import { TopicModule } from './resources/topic/topic.module'
import { PublicationModule } from './resources/publication/publication.module'

@Module({
  imports: [
    AssociationModule,
    DatabaseModule,
    UserModule,
    MemberEventModule,
    UserAssociationModule,
    EventModule,
    DayModule,
    TopicModule,
    CommentModule,
    PublicationModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppModule {}
