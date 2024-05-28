import { DataSource } from 'typeorm'
export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async (): Promise<DataSource> => {
      const port = Number(process.env.DATABASE_PORT)
      if (isNaN(port)) {
        throw new Error('Invalid port number')
      }
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        ssl: {
          rejectUnauthorized: false
        }
      })

      return dataSource.initialize()
    }
  }
]
