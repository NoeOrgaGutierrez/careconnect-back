import { PartialType } from '@nestjs/swagger'
import { CreateAssignmentPermissionDto } from './create-assignment-permission.dto'

export class UpdateAssignmentPermissionDto extends PartialType(
  CreateAssignmentPermissionDto
) {}
