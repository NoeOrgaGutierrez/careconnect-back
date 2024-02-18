import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from './database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [AppService]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppModule {}
