import { Publication } from 'src/resources/publication/entities/publication.entity'
import { User } from 'src/resources/user/entities/user.entity'
import { Comment } from 'src/resources/comment/entities/comment.entity'

export class CreateCommentDto {
  publication: Publication
  user: User
  parentComment: Comment
  content: string
  updated: Date
}
