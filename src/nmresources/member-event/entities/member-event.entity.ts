import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class MemberEvent {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  memberId: number
  @Column()
  eventId: number
  @Column()
  rol: number
}
