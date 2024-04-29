import { User } from 'src/resources/user/entities/user.entity'

export class CreateTopicDto {
  user: User
  name: string
  description: string
}
