import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { Storage } from '@google-cloud/storage'
import { format } from 'util'
import { config } from 'dotenv'

// Cargar las variables de entorno desde el archivo .env
config()

@Injectable()
export class StorageService {
  private readonly storage: Storage
  private readonly bucketName: string

  constructor() {
    this.storage = new Storage({
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
    })
    this.bucketName = process.env.BUCKET_ID || 'bucket-id'
  }

  async uploadFile(
    file: Express.Multer.File,
    destinationPath: string,
    newFileName: string
  ): Promise<void> {
    const bucket = this.storage.bucket(this.bucketName)

    // Use the new file name provided
    const blob = bucket.file(`${destinationPath}/${newFileName}`)

    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: {
        contentType: file.mimetype
      }
    })

    return new Promise((resolve, reject) => {
      blobStream.on('finish', () => {
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        )
        resolve()
      })

      blobStream.on('error', (err) => {
        console.error('Error uploading file:', err.message)
        reject(
          new InternalServerErrorException(
            'Error uploading file: ' + err.message
          )
        )
      })

      // 'end' event handler is not necessary unless you want to handle the premature closure specifically
      blobStream.on('end', () => {})

      blobStream.end(file.buffer)
    })
  }
}
