import { Association } from 'src/resources/association/entities/association.entity'
import { BlogComment } from 'src/resources/blog-comment/entities/blog-comment.entity'
import { Pin } from 'src/resources/pin/entities/pin.entity'
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
@Index(['name', 'association'], { unique: true })
export class Blog {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 50 })
  name: string
  @Column({ length: 1000 })
  description: string
  // RELATIONS
  @ManyToOne(() => Association, (association) => association.blogs, {
    nullable: false
  })
  association: Association
  @OneToMany(() => BlogComment, (blogComment) => blogComment.blog)
  blogComments: BlogComment[]
  @OneToMany(() => Pin, (pin) => pin.blog)
  pins: Pin[]
}
