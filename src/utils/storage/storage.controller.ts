import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { StorageService } from './storage.service'
import { ApiConsumes, ApiBody, ApiTags, ApiOperation } from '@nestjs/swagger'
@ApiTags('Storage')
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}
  @ApiOperation({ summary: 'Upload file' })
  @Post('upload/:destinationPath/:newFileName')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('destinationPath') destinationPath: string,
    @Param('newFileName') newFileName: string
  ): Promise<void> {
    return this.storageService.uploadFile(file, destinationPath, newFileName)
  }
}
