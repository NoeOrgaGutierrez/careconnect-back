import { Association } from 'src/resources/association/entities/association.entity'

export class CreateEventDto {
  association: Association
  dateStart: Date
  dateEnd: Date
  description: string
}
