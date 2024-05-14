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
  @ManyToOne(() => Association, (association) => association.id)
  @JoinColumn({ name: 'association' })
  association: Association
  @Column()
  dateStart: Date
  @Column()
  dateEnd: Date
  @Column({ length: 500 })
  description: string
  @Column({ nullable: true, length: 1000 })
  banner: string
}
