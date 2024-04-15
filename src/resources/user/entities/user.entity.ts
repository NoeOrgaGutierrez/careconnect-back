import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ length: 20 })
  name: string
  @Column({ length: 40 })
  surname: string
  @Column({ length: 50 })
  email: string
  @Column({ length: 15 })
  password: string
}
