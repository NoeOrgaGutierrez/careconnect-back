import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ length: 25 })
  name: string
}
