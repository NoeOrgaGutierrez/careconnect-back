import { Inject, Injectable } from '@nestjs/common'
import { CreatePermissionDto } from './dto/create-permission.dto'
import { UpdatePermissionDto } from './dto/update-permission.dto'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { Permission } from './entities/permission.entity'

@Injectable()
export class PermissionService {
  constructor(
    @Inject('PERMISSION_REPOSITORY')
    private readonly permissionRepository: Repository<Permission>
  ) {}
  create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const newPermission: Permission =
      this.permissionRepository.create(createPermissionDto)
    return this.permissionRepository.save(newPermission)
  }

  findAll(): Promise<Permission[]> {
    return this.permissionRepository.find()
  }

  findOne(id: number): Promise<Permission | null> {
    return this.permissionRepository.findOne({ where: { id } })
  }

  update(
    id: number,
    updatePermissionDto: UpdatePermissionDto
  ): Promise<UpdateResult> {
    return this.permissionRepository.update(id, updatePermissionDto)
  }

  remove(id: number): Promise<DeleteResult> {
    return this.permissionRepository.delete(id)
  }
}
