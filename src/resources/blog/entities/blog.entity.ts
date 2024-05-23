import { Association } from 'src/resources/association/entities/association.entity'
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
  @ManyToOne(() => Association, (association) => association.blogs)
  @JoinColumn({ name: 'association' })
  association: Association
  @Column({ length: 50 })
  name: string
  @Column({ length: 100 })
  description: string
}
