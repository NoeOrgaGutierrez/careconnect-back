import { Module } from '@nestjs/common'
import { UserAssociationService } from './user-association.service'
import { UserAssociationController } from './user-association.controller'
import { DatabaseModule } from 'src/database/database.module'
import { userAssociationProviders } from './user-association.providers'

@Module({
  imports: [DatabaseModule],
  controllers: [UserAssociationController],
  providers: [UserAssociationService, ...userAssociationProviders]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class UserAssociationModule {}
