import { Inject, Injectable, NotFoundException } from '@nestjs/common'
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

  async findAll(): Promise<Permission[]> {
    const permissions: Permission[] = await this.permissionRepository.find()
    if (permissions.length > 0) {
      return permissions
    }
    throw new NotFoundException('Permissions not found')
  }

  async findOne(id: number): Promise<Permission> {
    const permission: Permission | null =
      await this.permissionRepository.findOne({ where: { id } })
    if (permission) {
      return permission
    }
    throw new NotFoundException('Permission not found')
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
