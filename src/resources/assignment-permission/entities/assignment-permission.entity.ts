import { Assignment } from 'src/resources/assignment/entities/assignment.entity'
import { Permission } from 'src/resources/permission/entities/permission.entity'
import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
@Index(['assignment', 'permission'], { unique: true })
export class AssignmentPermission {
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne(() => Assignment, (assignment) => assignment.id)
  @JoinColumn({ name: 'assignment' })
  assignment: Assignment
  @ManyToOne(() => Permission, (permission) => permission.id)
  @JoinColumn({ name: 'permission' })
  permission: Permission
}
