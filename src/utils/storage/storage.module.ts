import { Module } from '@nestjs/common'
import { StorageService } from './storage.service'
import { StorageController } from './storage.controller'

@Module({
  controllers: [StorageController],
  providers: [StorageService]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class StorageModule {}
