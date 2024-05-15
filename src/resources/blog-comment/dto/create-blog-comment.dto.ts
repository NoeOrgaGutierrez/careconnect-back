import { Blog } from 'src/resources/blog/entities/blog.entity'
import { UserAssociation } from 'src/resources/user-association/entities/user-association.entity'
import { BlogComment } from '../entities/blog-comment.entity'

export class CreateBlogCommentDto {
  blog: Blog
  member: UserAssociation
  parentComment: BlogComment
  content: string
  date: Date
}
