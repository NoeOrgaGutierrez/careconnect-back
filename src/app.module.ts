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
import { PermissionModule } from './resources/permission/permission.module'
import { AssignmentModule } from './resources/assignment/assignment.module'
import { ConfigModule } from '@nestjs/config'
import { MemberEventModule } from './resources/member-event/member-event.module'
import { UserAssociationModule } from './resources/user-association/user-association.module'
import { MemberAssignmentModule } from './resources/member-assignment/member-assignment.module'
import { AssignmentPermissionModule } from './resources/assignment-permission/assignment-permission.module'
import { BlogModule } from './resources/blog/blog.module'
import { BlogCommentModule } from './resources/blog-comment/blog-comment.module'
import { StorageModule } from './utils/storage/storage.module'
import { FaqModule } from './resources/faq/faq.module';

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
    PermissionModule,
    AssignmentModule,
    MemberAssignmentModule,
    ConfigModule.forRoot({}),
    AssignmentPermissionModule,
    BlogModule,
    BlogCommentModule,
    StorageModule,
    FaqModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppModule {}
