import { User } from 'src/resources/user/entities/user.entity'
import { Evento } from 'src/resources/event/entities/event.entity'
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserAssociation } from 'src/nmresources/user-association/entities/user-association.entity'
import { Assignment } from 'src/resources/assignment/entities/assignment.entity'

@Entity()
export class MemberEvent {
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userAssociation' })
  userAssociation: UserAssociation
  @ManyToOne(() => Evento)
  @JoinColumn({ name: 'evento' })
  evento: Evento
  @ManyToOne(() => Assignment)
  @JoinColumn({ name: 'assignment' })
  assignment: Assignment
}
