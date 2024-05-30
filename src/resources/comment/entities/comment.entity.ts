import { Publication } from 'src/resources/publication/entities/publication.entity'
import { User } from 'src/resources/user/entities/user.entity'
import { Valoration } from 'src/resources/valoration/entities/valoration.entity'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ length: 500 })
  content: string
  @Column()
  created: Date
  @Column()
  updated: Date
  // RELATIONS
  @ManyToOne(() => Publication, (publication) => publication.id, {
    nullable: false
  })
  publication: Publication
  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  user: User
  @ManyToOne(() => Comment, (parentComment) => parentComment.id, {
    nullable: true
  })
  parentComment: Comment
  @OneToMany(() => Comment, (comment) => comment.parentComment)
  comments: Comment[]
  @OneToMany(() => Valoration, (valoration) => valoration.blogComment)
  valoration: Valoration[]
}
