import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { UserProviders } from './user.providers'
import { DatabaseModule } from 'src/database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...UserProviders]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class UserModule {}
