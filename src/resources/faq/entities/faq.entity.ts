import { Association } from 'src/resources/association/entities/association.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Faq {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  question: string
  @Column()
  response: string
  // RELATIONS
  @ManyToOne(() => Association, (association) => association.id, {
    nullable: false
  })
  association: Association
}
