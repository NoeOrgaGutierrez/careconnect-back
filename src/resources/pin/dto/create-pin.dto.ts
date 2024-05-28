import { Blog } from 'src/resources/blog/entities/blog.entity'
import { UserAssociation } from 'src/resources/user-association/entities/user-association.entity'

export class CreatePinDto {
  member: UserAssociation
  blog: Blog
}
