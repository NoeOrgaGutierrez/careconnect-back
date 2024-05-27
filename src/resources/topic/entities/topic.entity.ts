import { Publication } from 'src/resources/publication/entities/publication.entity'
import { User } from 'src/resources/user/entities/user.entity'
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
@Entity()
@Index(['user', 'name'], { unique: true })
export class Topic {
  // COLUMNAS DE BBDD
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  name: string
  @Column()
  description: string
  // RELACIONES
  @OneToMany(() => Publication, (publication) => publication.topic)
  publications: Publication[]
  @ManyToOne(() => User, (user) => user.id)
  user: User
}
