import { Module } from '@nestjs/common'
import { AssociationService } from './association.service'
import { AssociationProviders } from './association.providers'
import { DatabaseModule } from 'src/database/database.module'
import { AssociationController } from './association.controller'

@Module({
  imports: [DatabaseModule],
  providers: [...AssociationProviders, AssociationService],
  controllers: [AssociationController]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AssociationModule {}
