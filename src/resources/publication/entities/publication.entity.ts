import { Comment } from 'src/resources/comment/entities/comment.entity'
import { Topic } from 'src/resources/topic/entities/topic.entity'
import { User } from 'src/resources/user/entities/user.entity'
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
@Index(['topic', 'user', 'name'], { unique: true })
export class Publication {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  name: string
  @Column()
  description: string
  // RELATIONS
  @ManyToOne(() => Topic, (topic) => topic.id)
  topic: Topic
  @ManyToOne(() => User, (user) => user.id)
  user: User
  @OneToMany(() => Comment, (comment) => comment.publication)
  comments: Comment[]
}
