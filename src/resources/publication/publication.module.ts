import { Module } from '@nestjs/common'
import { PublicationService } from './publication.service'
import { PublicationController } from './publication.controller'
import { DatabaseModule } from 'src/database/database.module'
import { publicationProviders } from './publication.providers'

@Module({
  imports: [DatabaseModule],
  controllers: [PublicationController],
  providers: [PublicationService, ...publicationProviders]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class PublicationModule {}
