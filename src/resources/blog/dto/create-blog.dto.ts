import { Association } from 'src/resources/association/entities/association.entity'

export class CreateBlogDto {
  name: string
  association: Association
  description: string
}
