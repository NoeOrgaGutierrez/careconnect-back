import { PartialType } from '@nestjs/swagger'
import { CreateMemberAssignmentDto } from './create-member-assignment.dto'

export class UpdateMemberAssignmentDto extends PartialType(
  CreateMemberAssignmentDto
) {}
