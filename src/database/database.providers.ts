import { DataSource } from 'typeorm'

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async (): Promise<DataSource> => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'postgresdb.cg6vma2ag6q6.us-east-1.rds.amazonaws.com',
        port: 5432,
        username: 'postgres',
        password: '12344321',
        database: 'CareConnect',
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
