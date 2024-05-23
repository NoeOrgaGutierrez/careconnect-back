import { UserAssociation } from 'src/resources/user-association/entities/user-association.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne(() => UserAssociation, (member) => member.id)
  @JoinColumn({ name: 'member' })
  member: UserAssociation
  @Column({ length: 50 })
  name: string
  @Column({ length: 100 })
  description: string
}
