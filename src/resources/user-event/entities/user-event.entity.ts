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
  @ManyToOne(() => Evento, (event) => event.id)
  @JoinColumn({ name: 'event' })
  event: Evento
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user' })
  user: User
  @Column()
  initialHour: Date
  @Column()
  finalHour: Date
}
