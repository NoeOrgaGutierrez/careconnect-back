import { Module } from '@nestjs/common'
import { DatabaseService } from './database.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/users/entities/user.entity'
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgresdb.cg6vma2ag6q6.us-east-1.rds.amazonaws.com',
      port: 5432,
      username: 'postgres',
      password: '12344321',
      database: 'CareConnect',
      entities: [User],
      ssl: true, // Dejar SSL en true para habilitar la encriptación
      extra: {
        ssl: {
          rejectUnauthorized: false // Rechazar certificados no autorizados
        }
      },
      synchronize: true
    })
  ],
  providers: [DatabaseService],
  exports: [DatabaseService]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class DatabaseModule {}
