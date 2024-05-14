import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { AssignmentPermissionService } from './assignment-permission.service'
import { CreateAssignmentPermissionDto } from './dto/create-assignment-permission.dto'
import { UpdateAssignmentPermissionDto } from './dto/update-assignment-permission.dto'
import { AssignmentPermission } from './entities/assignment-permission.entity'
import { DeleteResult, UpdateResult } from 'typeorm'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
@ApiTags('AssignmentPermission')
@Controller('assignment-permission')
export class AssignmentPermissionController {
  constructor(
    private readonly assignmentPermissionService: AssignmentPermissionService
  ) {}
  @ApiOperation({
    summary: 'Create new relation between a permission and a role'
  })
  @Post()
  create(
    @Body() createAssignmentPermissionDto: CreateAssignmentPermissionDto
  ): Promise<AssignmentPermission> {
    return this.assignmentPermissionService.create(
      createAssignmentPermissionDto
    )
  }
  @ApiOperation({
    summary: 'Get all assigned permissions and its roles'
  })
  @Get()
  findAll(): Promise<AssignmentPermission[]> {
    return this.assignmentPermissionService.findAll()
  }
  @ApiOperation({
    summary: 'Get a relation between a permission and a role'
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<AssignmentPermission | null> {
    return this.assignmentPermissionService.findOne(+id)
  }
  @ApiOperation({
    summary: 'Update a relation between a permission and a role'
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssignmentPermissionDto: UpdateAssignmentPermissionDto
  ): Promise<UpdateResult> {
    return this.assignmentPermissionService.update(
      +id,
      updateAssignmentPermissionDto
    )
  }
  @ApiOperation({
    summary: 'Delete a relation between a permission and a role'
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.assignmentPermissionService.remove(+id)
  }
}
