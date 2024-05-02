import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { MemberAssignmentService } from './member-assignment.service'
import { CreateMemberAssignmentDto } from './dto/create-member-assignment.dto'
import { UpdateMemberAssignmentDto } from './dto/update-member-assignment.dto'
import { MemberAssignment } from './entities/member-assignment.entity'
import { DeleteResult, UpdateResult } from 'typeorm'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
@ApiTags('UserAssignment')
@Controller('member-assignment')
export class MemberAssignmentController {
  constructor(
    private readonly memberAssignmentService: MemberAssignmentService
  ) {}
  @ApiOperation({
    summary: 'Create a new relation between an assignment and a user'
  })
  @Post()
  create(
    @Body() createMemberAssignmentDto: CreateMemberAssignmentDto
  ): Promise<MemberAssignment> {
    return this.memberAssignmentService.create(createMemberAssignmentDto)
  }
  @ApiOperation({ summary: 'Get all assigned assignments and its users' })
  @Get()
  findAll(): Promise<MemberAssignment[]> {
    return this.memberAssignmentService.findAll()
  }
  @ApiOperation({ summary: 'Get an assigned assignment and its user' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<MemberAssignment | null> {
    return this.memberAssignmentService.findOne(+id)
  }
  @ApiOperation({ summary: 'Update an assigned assignment and its user' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMemberAssignmentDto: UpdateMemberAssignmentDto
  ): Promise<UpdateResult> {
    return this.memberAssignmentService.update(+id, updateMemberAssignmentDto)
  }
  @ApiOperation({ summary: 'Delete an assigned assignment' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.memberAssignmentService.remove(+id)
  }
}
