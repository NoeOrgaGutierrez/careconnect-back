import { Blog } from 'src/resources/blog/entities/blog.entity'
import { Faq } from 'src/resources/faq/entities/faq.entity'
import { UserAssociation } from 'src/resources/user-association/entities/user-association.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Association {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 50, unique: true })
  name: string

  @Column({ length: 50 })
  loginCode: string

  @Column({ length: 100 })
  password: string

  @Column({ length: 500 })
  miniDescription: string

  @Column({ length: 200 })
  description: string

  @Column({ length: 1000 })
  logo: string

  @Column({ length: 1000 })
  banner: string
  // RELATIONS
  @OneToMany(() => UserAssociation, (member) => member.association)
  members: UserAssociation[]
  @OneToMany(() => Blog, (blog) => blog.association)
  blogs: Blog[]
  @OneToMany(() => Faq, (faq) => faq.association)
  faq: Faq[]
}
