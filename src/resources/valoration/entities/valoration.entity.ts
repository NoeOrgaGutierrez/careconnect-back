import { BlogComment } from 'src/resources/blog-comment/entities/blog-comment.entity'
import { UserAssociation } from 'src/resources/user-association/entities/user-association.entity'
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
@Index(['userAssociation', 'blogComment'], { unique: true })
export class Valoration {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  valoration: boolean
  // RELATIONS
  @ManyToOne(
    () => UserAssociation,
    (userAssociation) => userAssociation.valoration,
    {
      nullable: false
    }
  )
  userAssociation: UserAssociation
  @ManyToOne(() => BlogComment, (blogComment) => blogComment.valoration, {
    nullable: false
  })
  blogComment: BlogComment
}
