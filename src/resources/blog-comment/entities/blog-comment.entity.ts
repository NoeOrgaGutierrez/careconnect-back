import { Blog } from 'src/resources/blog/entities/blog.entity'
import { UserAssociation } from 'src/resources/user-association/entities/user-association.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class BlogComment {
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne(() => Blog, (blog) => blog.blogComments, { nullable: false })
  blog: Blog
  @ManyToOne(() => UserAssociation, (member) => member.id, { nullable: false })
  member: UserAssociation
  @ManyToOne(() => BlogComment, (parentComment) => parentComment.id, {
    nullable: true
  })
  parentComment: BlogComment
  @Column({ length: 250 })
  content: string
  @Column()
  created: Date
  @Column({ nullable: true })
  updated: Date
}
