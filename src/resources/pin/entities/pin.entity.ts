import { Blog } from 'src/resources/blog/entities/blog.entity'
import { User } from 'src/resources/user/entities/user.entity'
import { Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@Index(['user', 'blog'], { unique: true })
export class Pin {
  @PrimaryGeneratedColumn()
  id: number
  // RELATIONS
  @ManyToOne(() => User, (user) => user.pins, { nullable: false })
  user: User
  @ManyToOne(() => Blog, (blog) => blog.pins, { nullable: false })
  blog: Blog
}
