import { Publication } from 'src/resources/publication/entities/publication.entity'
import { User } from 'src/resources/user/entities/user.entity'

export class CreateCommentDto {
  publication: Publication
  user: User
  content: string
  created_at: Date
  updated_at: Date
}
