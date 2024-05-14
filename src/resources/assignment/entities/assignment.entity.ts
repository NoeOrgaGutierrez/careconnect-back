import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ length: 20, unique: true })
  name: string
  @Column({ length: 50 })
  description: string
}
