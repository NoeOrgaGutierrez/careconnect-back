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
import { PermissionModule } from './resources/permission/permission.module'
import { AssignmentModule } from './resources/assignment/assignment.module'
import { MemberAssignmentModule } from './nmresources/member-assignment/member-assignment.module'
import { ConfigModule } from '@nestjs/config'

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
    PublicationModule,
    PermissionModule,
    AssignmentModule,
    MemberAssignmentModule,
    ConfigModule.forRoot({})
  ],
  controllers: [AppController],
  providers: [AppService]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppModule {}
