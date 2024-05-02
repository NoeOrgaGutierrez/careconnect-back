import { Evento } from 'src/resources/event/entities/event.entity'
import { UserAssociation } from 'src/resources/user-association/entities/user-association.entity'
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class MemberEvent {
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne(() => UserAssociation, (userAssociation) => userAssociation.id)
  @JoinColumn({ name: 'userAssociation' })
  userAssociation: UserAssociation
  @ManyToOne(() => Evento, (evento) => evento.id)
  @JoinColumn({ name: 'evento' })
  evento: Evento
}
