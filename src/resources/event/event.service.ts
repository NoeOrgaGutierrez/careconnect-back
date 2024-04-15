import { Inject, Injectable } from '@nestjs/common'
import { CreateEventDto } from './dto/create-event.dto'
import { UpdateEventDto } from './dto/update-event.dto'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { Event } from './entities/event.entity'

@Injectable()
export class EventService {
  constructor(
    @Inject('EVENT_REPOSITORY')
    private eventRepository: Repository<Event>
  ) {}
  create(createEventDto: CreateEventDto): Promise<Event> {
    const newEvent: Event = this.eventRepository.create(createEventDto)
    return this.eventRepository.save(newEvent)
  }

  findAll(): Promise<Event[]> {
    return this.eventRepository.find()
  }

  findOne(id: number): Promise<Event | null> {
    return this.eventRepository.findOne({ where: { id } })
  }

  update(id: number, updateEventDto: UpdateEventDto): Promise<UpdateResult> {
    return this.eventRepository.update(id, updateEventDto)
  }

  remove(id: number): Promise<DeleteResult> {
    return this.eventRepository.delete(id)
  }
}
