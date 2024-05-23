import { Association } from 'src/resources/association/entities/association.entity'

export class CreateFaqDto {
  question: string
  response: string
  association: Association
}
