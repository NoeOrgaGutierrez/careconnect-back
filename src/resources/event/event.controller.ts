import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { EventService } from './event.service'
import { CreateEventDto } from './dto/create-event.dto'
import { UpdateEventDto } from './dto/update-event.dto'
import { DeleteResult, UpdateResult } from 'typeorm'
import { Evento } from './entities/event.entity'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
@ApiTags('Evento')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiOperation({ summary: 'Create an event' })
  @Post()
  create(@Body() createEventDto: CreateEventDto): Promise<Evento> {
    return this.eventService.create(createEventDto)
  }
  @ApiOperation({ summary: 'Get all events' })
  @Get()
  findAll(): Promise<Evento[]> {
    return this.eventService.findAll()
  }
  @ApiOperation({ summary: 'Get an event' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Evento | null> {
    return this.eventService.findOne(+id)
  }
  @ApiOperation({ summary: 'Update an event' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto
  ): Promise<UpdateResult> {
    return this.eventService.update(+id, updateEventDto)
  }
  @ApiOperation({ summary: 'Delete an event' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.eventService.remove(+id)
  }
}
