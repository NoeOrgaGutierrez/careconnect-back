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
@Index(['user', 'name'], { unique: true })
export class Topic {
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user' })
  user: User
  @Column()
  name: string
  @Column()
  description: string
}
