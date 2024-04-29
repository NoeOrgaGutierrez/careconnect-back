import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { PermissionService } from './permission.service'
import { CreatePermissionDto } from './dto/create-permission.dto'
import { UpdatePermissionDto } from './dto/update-permission.dto'
import { Permission } from './entities/permission.entity'
import { DeleteResult, UpdateResult } from 'typeorm'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
@ApiTags('Permission')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}
  @ApiOperation({ summary: 'Create permission' })
  @Post()
  create(
    @Body() createPermissionDto: CreatePermissionDto
  ): Promise<Permission> {
    return this.permissionService.create(createPermissionDto)
  }
  @ApiOperation({ summary: 'Get all permissions' })
  @Get()
  findAll(): Promise<Permission[]> {
    return this.permissionService.findAll()
  }
  @ApiOperation({ summary: 'Get permission by id' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Permission | null> {
    return this.permissionService.findOne(+id)
  }
  @ApiOperation({ summary: 'Update permission' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto
  ): Promise<UpdateResult> {
    return this.permissionService.update(+id, updatePermissionDto)
  }
  @ApiOperation({ summary: 'Delete permission' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.permissionService.remove(+id)
  }
}
