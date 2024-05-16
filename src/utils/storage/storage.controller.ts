import { Controller, Post, UploadedFile } from '@nestjs/common'
import { StorageService } from './storage.service'

@Controller('Storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}
  @Post()
  uploadFile(@UploadedFile() file: string): Promise<void> {
    return this.storageService.uploadFile(file)
  }
}
