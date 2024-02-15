import { Injectable } from '@nestjs/common'
import { EntityManager } from 'typeorm'

@Injectable()
export class DatabaseService {
  constructor(private entityManager: EntityManager) {}

  async checkConnection(): Promise<void> {
    try {
      await this.entityManager.query('SELECT 1')
    } catch (error) {
      throw new Error('Error al conectar con la base de datos: ' + error)
    }
  }
}
