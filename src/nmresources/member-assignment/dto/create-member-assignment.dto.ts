import { UserAssociation } from 'src/nmresources/user-association/entities/user-association.entity'
import { Assignment } from 'src/resources/assignment/entities/assignment.entity'

export class CreateMemberAssignmentDto {
  member: UserAssociation
  assignment: Assignment
}
