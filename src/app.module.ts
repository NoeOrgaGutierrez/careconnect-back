import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AssociationModule } from './association/association.module'
import { DatabaseModule } from './database/database.module'

@Module({
  imports: [AssociationModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppModule {}
