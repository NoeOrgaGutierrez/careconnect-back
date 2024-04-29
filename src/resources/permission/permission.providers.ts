import { DataSource, Repository } from 'typeorm'
import { Permission } from './entities/permission.entity'

export const permissionProviders = [
  {
    provide: 'PERMISSION_REPOSITORY',
    useFactory: (dataSource: DataSource): Repository<Permission> =>
      dataSource.getRepository(Permission),
    inject: ['DATA_SOURCE']
  }
]
