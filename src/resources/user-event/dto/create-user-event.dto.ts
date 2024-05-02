import { Evento } from 'src/resources/event/entities/event.entity'
import { User } from 'src/resources/user/entities/user.entity'

export class CreateUserEventDto {
  event: Evento
  user: User
  initialHour: Date
  finalHour: Date
}
