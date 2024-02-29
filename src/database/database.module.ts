import { Module } from '@nestjs/common'
import { databaseProviders } from './database.providers'

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class DatabaseModule {}
