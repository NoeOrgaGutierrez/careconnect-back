export class CreateCommentDto {
  publicationId: number
  userId: number
  content: string
  created_at: Date
  updated_at: Date
}
