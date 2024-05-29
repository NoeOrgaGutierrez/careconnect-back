import { BlogComment } from 'src/resources/blog-comment/entities/blog-comment.entity'
import { UserAssociation } from 'src/resources/user-association/entities/user-association.entity'

export class CreateValorationDto {
  valoration: boolean
  userAssociation: UserAssociation
  blogComment: BlogComment
}
