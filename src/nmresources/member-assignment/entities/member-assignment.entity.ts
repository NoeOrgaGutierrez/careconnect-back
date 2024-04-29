import { UserAssociation } from 'src/nmresources/user-association/entities/user-association.entity'
import { Assignment } from 'src/resources/assignment/entities/assignment.entity'
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class MemberAssignment {
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne(() => UserAssociation)
  @JoinColumn({ name: 'member' })
  member: UserAssociation
  @ManyToOne(() => Assignment)
  @JoinColumn({ name: 'assignment' })
  assignment: Assignment
}
