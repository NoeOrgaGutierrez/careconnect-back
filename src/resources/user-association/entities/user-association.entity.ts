import { Association } from 'src/resources/association/entities/association.entity'
import { Blog } from 'src/resources/blog/entities/blog.entity'
import { User } from 'src/resources/user/entities/user.entity'
import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
@Index(['user', 'association'], { unique: true })
export class UserAssociation {
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user' })
  user: User
  @ManyToOne(() => Association, (association) => association.id)
  @JoinColumn({ name: 'association' })
  association: Association
  // RELACIONES
  @OneToMany(() => Blog, (blog) => blog.member)
  blogs: Blog[]
}
