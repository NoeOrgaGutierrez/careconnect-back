import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

import { User } from 'src/resources/user/entities/user.entity'
import { Evento } from 'src/resources/event/entities/event.entity'

@Entity()
export class UserEvent {
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne(() => Evento)
  @JoinColumn({ name: 'eventId' })
  eventId: number
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  userId: number
  @Column()
  initialHour: Date
  @Column()
  finalHour: Date
}
