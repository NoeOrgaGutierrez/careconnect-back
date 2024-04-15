import { PartialType } from '@nestjs/mapped-types'
import { CreateUserAssociationDto } from './create-user-association.dto'

export class UpdateUserAssociationDto extends PartialType(
  CreateUserAssociationDto
) {}
