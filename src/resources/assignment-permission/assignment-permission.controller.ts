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

@Controller('assignment-permission')
export class AssignmentPermissionController {
  constructor(
    private readonly assignmentPermissionService: AssignmentPermissionService
  ) {}

  @Post()
  create(
    @Body() createAssignmentPermissionDto: CreateAssignmentPermissionDto
  ): Promise<AssignmentPermission> {
    return this.assignmentPermissionService.create(
      createAssignmentPermissionDto
    )
  }

  @Get()
  findAll(): Promise<AssignmentPermission[]> {
    return this.assignmentPermissionService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<AssignmentPermission | null> {
    return this.assignmentPermissionService.findOne(+id)
  }

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

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.assignmentPermissionService.remove(+id)
  }
}
