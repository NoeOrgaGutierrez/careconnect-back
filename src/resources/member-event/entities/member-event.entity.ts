import { Evento } from 'src/resources/event/entities/event.entity'
import { UserAssociation } from 'src/resources/user-association/entities/user-association.entity'
import { Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@Index(['userAssociation', 'evento'], { unique: true })
export class MemberEvent {
  @PrimaryGeneratedColumn()
  id: number
  // RELATIONS
  @ManyToOne(() => UserAssociation, (userAssociation) => userAssociation.id)
  userAssociation: UserAssociation
  @ManyToOne(() => Evento, (evento) => evento.id)
  evento: Evento
}
