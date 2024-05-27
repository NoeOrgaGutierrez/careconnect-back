import { Association } from 'src/resources/association/entities/association.entity'
import { BlogComment } from 'src/resources/blog-comment/entities/blog-comment.entity'
import { Pin } from 'src/resources/pin/entities/pin.entity'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne(() => Association, (association) => association.blogs)
  association: Association
  @Column({ length: 50 })
  name: string
  @Column({ length: 100 })
  description: string
  // RELATIONS
  @OneToMany(() => BlogComment, (blogComment) => blogComment.blog)
  blogComments: BlogComment[]
  @OneToMany(() => Pin, (pin) => pin.blog)
  pins: Pin[]
}
