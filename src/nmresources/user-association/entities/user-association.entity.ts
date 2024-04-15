import { Association } from 'src/resources/association/entities/association.entity'
import { User } from 'src/resources/user/entities/user.entity'
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class UserAssociation {
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  userId: number
  @ManyToOne(() => Association)
  @JoinColumn({ name: 'associationId' })
  associationId: number
}
