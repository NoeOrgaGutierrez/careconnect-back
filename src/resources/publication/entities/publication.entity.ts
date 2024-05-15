import { Topic } from 'src/resources/topic/entities/topic.entity'
import { User } from 'src/resources/user/entities/user.entity'
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
@Index(['topic', 'user', 'name'], { unique: true })
export class Publication {
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne(() => Topic, (topic) => topic.id)
  @JoinColumn({ name: 'topic' })
  topic: Topic
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user' })
  user: User
  @Column()
  name: string
  @Column()
  description: string
}
