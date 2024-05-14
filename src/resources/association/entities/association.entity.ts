import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Association {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 50, unique: true })
  name: string

  @Column({ length: 50 })
  loginCode: string

  @Column({ length: 25 })
  password: string

  @Column({ length: 500 })
  miniDescription: string

  @Column({ length: 200 })
  description: string

  @Column({ length: 1000 })
  logo: string

  @Column({ length: 1000 })
  banner: string
}
