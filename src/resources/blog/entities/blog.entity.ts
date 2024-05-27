import { Association } from 'src/resources/association/entities/association.entity'
import { BlogComment } from 'src/resources/blog-comment/entities/blog-comment.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne(() => Association, (association) => association.blogs)
  @JoinColumn({ name: 'association' })
  association: Association
  @Column({ length: 50 })
  name: string
  @Column({ length: 100 })
  description: string
  // RELATIONS
  @OneToMany(() => BlogComment, (blogComment) => blogComment.blog)
  blogComments: BlogComment[]
}
