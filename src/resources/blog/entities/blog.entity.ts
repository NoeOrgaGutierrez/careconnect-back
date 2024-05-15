import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ length: 50 })
  name: string
  @Column({ length: 100 })
  description: string
}
