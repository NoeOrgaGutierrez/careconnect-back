import { Publication } from 'src/resources/publication/entities/publication.entity'
import { User } from 'src/resources/user/entities/user.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne(() => Publication)
  @JoinColumn({ name: 'publicationId' })
  publicationId: number
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  userId: number
  @Column()
  content: string
  @Column()
  created_at: Date
  @Column()
  updated_at: Date
}
