import { Blog } from 'src/resources/blog/entities/blog.entity'
import { UserAssociation } from 'src/resources/user-association/entities/user-association.entity'
import { Valoration } from 'src/resources/valoration/entities/valoration.entity'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class BlogComment {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ length: 250 })
  content: string
  @Column()
  created: Date
  @Column()
  updated: Date
  // RELATIONS
  @ManyToOne(() => Blog, (blog) => blog.blogComments, { nullable: false })
  blog: Blog
  @ManyToOne(() => UserAssociation, (member) => member.id, { nullable: false })
  member: UserAssociation
  @ManyToOne(() => BlogComment, (parentComment) => parentComment.id, {
    nullable: true
  })
  parentComment: BlogComment
  @OneToMany(() => BlogComment, (blogComment) => blogComment.parentComment)
  blogComments: BlogComment[]
  @OneToMany(() => Valoration, (valoration) => valoration.blogComment)
  valoration: Valoration[]
}
