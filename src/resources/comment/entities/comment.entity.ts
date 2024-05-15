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
  @ManyToOne(() => Publication, (publication) => publication.id)
  @JoinColumn({ name: 'publication' })
  publication: Publication
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user' })
  user: User
  @Column({ length: 500 })
  content: string
  @Column()
  created: Date
  @Column({ nullable: true })
  updated: Date
}
