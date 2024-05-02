import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { UserEvent } from './entities/user-event.entity'
import { DeleteResult, UpdateResult } from 'typeorm'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { UpdateUserEventDto } from './dto/update-user-event.dto'
import { CreateUserEventDto } from './dto/create-user-event.dto'
import { UserEventService } from './user-event.service'
@ApiTags('UserEvent')
@Controller('user-event')
export class UserEventController {
  constructor(private readonly userEventService: UserEventService) {}
  @ApiOperation({ summary: 'Create a new day for a user' })
  @Post()
  create(@Body() createUserEventDto: CreateUserEventDto): Promise<UserEvent> {
    return this.userEventService.create(createUserEventDto)
  }
  @ApiOperation({ summary: 'Get all days with events from a user' })
  @Get()
  findAll(): Promise<UserEvent[]> {
    return this.userEventService.findAll()
  }
  @ApiOperation({ summary: 'Get one day with events from a user' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserEvent | null> {
    return this.userEventService.findOne(+id)
  }
  @ApiOperation({ summary: 'Update a day with events from a user' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserEventDto: UpdateUserEventDto
  ): Promise<UpdateResult> {
    return this.userEventService.update(+id, updateUserEventDto)
  }
  @ApiOperation({ summary: 'Delete an event from a user' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.userEventService.remove(+id)
  }
}
