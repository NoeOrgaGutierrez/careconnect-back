import { Association } from 'src/resources/association/entities/association.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Evento {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  dateStart: Date
  @Column()
  dateEnd: Date
  @Column({ length: 500 })
  description: string
  @Column({ nullable: true, length: 1000 })
  banner: string
  // RELATIONS
  @ManyToOne(() => Association, (association) => association.id, {
    nullable: false
  })
  association: Association
}
