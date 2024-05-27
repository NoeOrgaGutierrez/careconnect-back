import { Blog } from 'src/resources/blog/entities/blog.entity'
import { User } from 'src/resources/user/entities/user.entity'
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Pin {
  @PrimaryGeneratedColumn()
  id: number
  // RELATIONS
  @ManyToOne(() => User, (user) => user.pins)
  user: User
  @ManyToOne(() => Blog, (blog) => blog.pins)
  blog: Blog
}
