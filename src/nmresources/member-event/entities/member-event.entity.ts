import { User } from 'src/resources/user/entities/user.entity'
import { Evento } from 'src/resources/event/entities/event.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class MemberEvent {
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne(() => User)
  @JoinColumn({ name: 'memberId' })
  memberId: number
  @ManyToOne(() => Evento)
  @JoinColumn({ name: 'eventId' })
  eventId: number
  @Column()
  rol: number
}
