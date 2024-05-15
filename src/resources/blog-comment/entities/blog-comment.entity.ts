import { Blog } from 'src/resources/blog/entities/blog.entity'
import { UserAssociation } from 'src/resources/user-association/entities/user-association.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class BlogComment {
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne(() => Blog, (blog) => blog.id)
  @JoinColumn({ name: 'blog' })
  blog: Blog
  @ManyToOne(() => UserAssociation, (member) => member.id)
  @JoinColumn({ name: 'member' })
  member: UserAssociation
  @ManyToOne(() => BlogComment, (parentComment) => parentComment.id, {
    nullable: true
  })
  @JoinColumn({ name: 'parentComment' })
  parentComment: BlogComment
  @Column({ length: 250 })
  content: string
  @Column()
  created: Date
  @Column({ nullable: true })
  updated: Date
}
