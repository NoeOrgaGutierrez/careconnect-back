import { Injectable } from '@nestjs/common'
import { Storage } from '@google-cloud/storage'
@Injectable()
export class StorageService {
  private readonly storage: Storage
  constructor() {
    this.storage = new Storage({ projectId: process.env.PROJECT_ID })
  }
  async uploadFile(): Promise<void> {
    await this.storage
      .bucket(process.env.BUCKET_NAME || 'bucket_id')
      .upload('borrar-fondo-imagen-1.webp', {
        destination: 'users/noe.webp'
      })
  }
}
