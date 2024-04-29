import { Topic } from 'src/resources/topic/entities/topic.entity'
import { User } from 'src/resources/user/entities/user.entity'

export class CreatePublicationDto {
  topic: Topic
  user: User
  name: string
  description: string
}
