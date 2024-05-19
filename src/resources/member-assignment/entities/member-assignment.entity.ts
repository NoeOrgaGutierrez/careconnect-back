import { Assignment } from 'src/resources/assignment/entities/assignment.entity'
import { UserAssociation } from 'src/resources/user-association/entities/user-association.entity'
import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
@Index(['member', 'assignment'], { unique: true })
export class MemberAssignment {
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne(() => UserAssociation, (member) => member.id)
  @JoinColumn({ name: 'member' })
  member: UserAssociation
  @ManyToOne(() => Assignment, (assignment) => assignment.id)
  @JoinColumn({ name: 'assignment' })
  assignment: Assignment
}