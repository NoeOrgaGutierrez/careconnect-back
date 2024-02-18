import { Module } from '@nestjs/common'
import { DatabaseService } from './database.service'
import { TypeOrmModule } from '@nestjs/typeorm'
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || 'port'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [],
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false
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
