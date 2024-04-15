import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Association {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 50 })
  name: string

  @Column({ length: 500, nullable: true })
  miniDescription: string

  @Column({ length: 200, nullable: true })
  description: string

  @Column({ length: 1000, nullable: true })
  logo: string

  @Column({ length: 1000, nullable: true })
  banner: string
}
