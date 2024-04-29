import { Module } from '@nestjs/common'
import { PermissionService } from './permission.service'
import { PermissionController } from './permission.controller'
import { DatabaseModule } from 'src/database/database.module'
import { permissionProviders } from './permission.providers'

@Module({
  imports: [DatabaseModule],
  controllers: [PermissionController],
  providers: [PermissionService, ...permissionProviders]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class PermissionModule {}
