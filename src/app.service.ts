import { Injectable } from '@nestjs/common'
import { DatabaseService } from './database/database.service'

@Injectable()
export class AppService {
  constructor(private readonly databaseService: DatabaseService) {}
  async checkDatabaseConnection(): Promise<string> {
    try {
      await this.databaseService.checkConnection()
      return 'Connected to database'
    } catch (error) {
      return 'Failed to connect to database'
    }
  }
}
