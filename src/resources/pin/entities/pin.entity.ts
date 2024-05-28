import { Blog } from 'src/resources/blog/entities/blog.entity'
import { UserAssociation } from 'src/resources/user-association/entities/user-association.entity'
import { Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@Index(['member', 'blog'], { unique: true })
export class Pin {
  @PrimaryGeneratedColumn()
  id: number
  // RELATIONS
  @ManyToOne(() => UserAssociation, (member) => member.pin, {
    nullable: false
  })
  member: UserAssociation
  @ManyToOne(() => Blog, (blog) => blog.pins, { nullable: false })
  blog: Blog
}
