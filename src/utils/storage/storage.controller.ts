import { Controller, Post } from '@nestjs/common'
import { StorageService } from './storage.service'

@Controller('Storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}
  @Post()
  uploadFile(): Promise<void> {
    return this.storageService.uploadFile()
  }
}
