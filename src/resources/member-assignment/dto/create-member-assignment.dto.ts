import { Assignment } from 'src/resources/assignment/entities/assignment.entity'
import { UserAssociation } from 'src/resources/user-association/entities/user-association.entity'

export class CreateMemberAssignmentDto {
  member: UserAssociation
  assignment: Assignment
}
