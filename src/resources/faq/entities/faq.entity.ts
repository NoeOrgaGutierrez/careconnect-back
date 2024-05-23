import { Association } from 'src/resources/association/entities/association.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Faq {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  question: string
  @Column()
  response: string
  @ManyToOne(() => Association, (association) => association.id)
  @JoinColumn({ name: 'association' })
  association: Association
}
