import { Association } from 'src/resources/association/entities/association.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Evento {
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne(() => Association)
  @JoinColumn({ name: 'association' })
  association: Association
  @Column()
  dateStart: Date
  @Column()
  dateEnd: Date
  @Column()
  description: string
}
