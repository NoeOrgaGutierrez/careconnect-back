import { UserAssociation } from 'src/nmresources/user-association/entities/user-association.entity'
import { Assignment } from 'src/resources/assignment/entities/assignment.entity'
import { Evento } from 'src/resources/event/entities/event.entity'

export class CreateMemberEventDto {
  userAssociation: UserAssociation
  evento: Evento
  assignment: Assignment
}
