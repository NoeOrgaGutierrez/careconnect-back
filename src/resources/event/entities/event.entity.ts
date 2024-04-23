import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Evento {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  hour: string
  @Column()
  date: string
  @Column()
  description: string
}
