import { PartialType } from '@nestjs/swagger'
import { CreateMemberEventDto } from './create-member-event.dto'

export class UpdateMemberEventDto extends PartialType(CreateMemberEventDto) {}
