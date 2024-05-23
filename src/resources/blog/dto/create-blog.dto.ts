import { UserAssociation } from 'src/resources/user-association/entities/user-association.entity'

export class CreateBlogDto {
  name: string
  member: UserAssociation
  description: string
}
