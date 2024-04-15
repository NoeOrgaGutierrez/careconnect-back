import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { MemberEventService } from './member-event.service'
import { CreateMemberEventDto } from './dto/create-member-event.dto'
import { UpdateMemberEventDto } from './dto/update-member-event.dto'

@Controller('member-event')
export class MemberEventController {
  constructor(private readonly memberEventService: MemberEventService) {}

  @Post()
  create(@Body() createMemberEventDto: CreateMemberEventDto) {
    return this.memberEventService.create(createMemberEventDto)
  }

  @Get()
  findAll() {
    return this.memberEventService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberEventService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMemberEventDto: UpdateMemberEventDto
  ) {
    return this.memberEventService.update(+id, updateMemberEventDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memberEventService.remove(+id)
  }
}
