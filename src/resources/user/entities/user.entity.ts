import { UserAssociation } from 'src/resources/user-association/entities/user-association.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Comment } from 'src/resources/comment/entities/comment.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ length: 1000, nullable: true })
  avatar: string
  @Column({ length: 100, nullable: true })
  bio: string
  @Column({ length: 20 })
  name: string
  @Column({ length: 40 })
  surname: string
  @Column({ length: 50, unique: true })
  email: string
  @Column({ length: 100 })
  password: string
  // RELATIONS
  @OneToMany(() => UserAssociation, (UserAssociation) => UserAssociation.user, {
    nullable: false
  })
  userAssociations: UserAssociation[]
  @OneToMany(() => Comment, (comment) => comment.user, {
    nullable: true
  })
  comments: Comment[]
}
