import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Association {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 50 })
  associationName: string

  @Column({ length: 500 })
  associationMiniDescription: string

  @Column({ length: 500 })
  associationDescription: string

  @Column({ length: 1000 })
  associationLogo: string

  @Column({ length: 1000 })
  associationBanner: string
}
