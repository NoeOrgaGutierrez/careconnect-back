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
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { MemberEvent } from './entities/member-event.entity'
import { DeleteResult, UpdateResult } from 'typeorm'
@ApiTags('MemberEvent')
@Controller('member-event')
export class MemberEventController {
  constructor(private readonly memberEventService: MemberEventService) {}
  @ApiOperation({ summary: 'Creates a new member of an event' })
  @Post()
  create(
    @Body() createMemberEventDto: CreateMemberEventDto
  ): Promise<MemberEvent> {
    return this.memberEventService.create(createMemberEventDto)
  }
  @ApiOperation({ summary: 'Get all members of an event' })
  @Get()
  findAll(): Promise<MemberEvent[]> {
    return this.memberEventService.findAll()
  }
  @ApiOperation({ summary: 'Get a member of an event' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<MemberEvent | null> {
    return this.memberEventService.findOne(+id)
  }
  @ApiOperation({ summary: 'Update a member of an event' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMemberEventDto: UpdateMemberEventDto
  ): Promise<UpdateResult> {
    return this.memberEventService.update(+id, updateMemberEventDto)
  }
  @ApiOperation({ summary: 'Delete a member of an event' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.memberEventService.remove(+id)
  }
}
