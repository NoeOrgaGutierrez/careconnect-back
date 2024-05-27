import { Association } from 'src/resources/association/entities/association.entity'
import { User } from 'src/resources/user/entities/user.entity'
import { Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@Index(['user', 'association'], { unique: true })
export class UserAssociation {
  @PrimaryGeneratedColumn()
  id: number
  // RELATIONS
  @ManyToOne(() => User, (user) => user.userAssociations)
  user: User
  @ManyToOne(() => Association, (association) => association.members)
  association: Association
}
