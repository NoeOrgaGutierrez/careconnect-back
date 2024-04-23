import { Topic } from 'src/resources/topic/entities/topic.entity'
import { User } from 'src/resources/user/entities/user.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Publication {
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne(() => Topic)
  @JoinColumn({ name: 'topicId' })
  topicId: number
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  userId: number
  @Column()
  name: string
  @Column()
  description: string
}
