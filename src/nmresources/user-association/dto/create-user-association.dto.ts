import { Association } from 'src/resources/association/entities/association.entity'
import { User } from 'src/resources/user/entities/user.entity'

export class CreateUserAssociationDto {
  user: User
  association: Association
}
