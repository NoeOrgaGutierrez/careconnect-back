import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { AssignmentService } from './assignment.service'
import { CreateAssignmentDto } from './dto/create-assignment.dto'
import { UpdateAssignmentDto } from './dto/update-assignment.dto'
import { Assignment } from './entities/assignment.entity'
import { DeleteResult, UpdateResult } from 'typeorm'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
@ApiTags('Assignment')
@Controller('assignment')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}
  @ApiOperation({ summary: 'Create a new assignment' })
  @Post()
  create(
    @Body() createAssignmentDto: CreateAssignmentDto
  ): Promise<Assignment> {
    return this.assignmentService.create(createAssignmentDto)
  }
  @ApiOperation({ summary: 'Get all assignments' })
  @Get()
  findAll(): Promise<Assignment[]> {
    return this.assignmentService.findAll()
  }
  @ApiOperation({ summary: 'Get assignment by id' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Assignment | null> {
    return this.assignmentService.findOne(+id)
  }
  @ApiOperation({ summary: 'Update assignment by id' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssignmentDto: UpdateAssignmentDto
  ): Promise<UpdateResult> {
    return this.assignmentService.update(+id, updateAssignmentDto)
  }
  @ApiOperation({ summary: 'Delete assignment by id' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.assignmentService.remove(+id)
  }
}
