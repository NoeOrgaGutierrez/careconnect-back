import { Evento } from 'src/resources/event/entities/event.entity'
import { UserAssociation } from 'src/resources/user-association/entities/user-association.entity'

export class CreateMemberEventDto {
  userAssociation: UserAssociation
  evento: Evento
}
