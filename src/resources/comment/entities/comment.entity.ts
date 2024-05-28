import { Publication } from 'src/resources/publication/entities/publication.entity'
import { User } from 'src/resources/user/entities/user.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ length: 500 })
  content: string
  @Column()
  created: Date
  @Column({ nullable: true })
  updated: Date
  // RELATIONS
  @ManyToOne(() => Publication, (publication) => publication.id, {
    nullable: false
  })
  publication: Publication
  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  user: User
}
