import { Association } from 'src/resources/association/entities/association.entity'
import { Pin } from 'src/resources/pin/entities/pin.entity'
import { User } from 'src/resources/user/entities/user.entity'
import {
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
@Index(['user', 'association'], { unique: true })
export class UserAssociation {
  @PrimaryGeneratedColumn()
  id: number
  // RELATIONS
  @ManyToOne(() => User, (user) => user.userAssociations, { nullable: false })
  user: User
  @ManyToOne(() => Association, (association) => association.members, {
    nullable: false
  })
  association: Association
  @OneToMany(() => Pin, (pin) => pin.member)
  pin: Pin[]
}
