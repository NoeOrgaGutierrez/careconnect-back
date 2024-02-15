import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { DatabaseService } from './database/database.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly databaseService: DatabaseService // Inyecta el servicio DatabaseService
  ) {}

  @Get()
  async getHello(): Promise<string> {
    try {
      await this.databaseService.checkConnection() // Verifica la conexión con la base de datos
      return 'La conexión con la base de datos es exitosa'
    } catch (error) {
      return 'Error al conectar con la base de datos: ' + error
    }
  }
}
