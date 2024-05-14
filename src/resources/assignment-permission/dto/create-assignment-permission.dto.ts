import { Assignment } from 'src/resources/assignment/entities/assignment.entity'
import { Permission } from 'src/resources/permission/entities/permission.entity'

export class CreateAssignmentPermissionDto {
  assignment: Assignment
  permission: Permission
}
