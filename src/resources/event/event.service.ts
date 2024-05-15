import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreateEventDto } from './dto/create-event.dto'
import { UpdateEventDto } from './dto/update-event.dto'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { Evento } from './entities/event.entity'

@Injectable()
export class EventService {
  constructor(
    @Inject('EVENT_REPOSITORY')
    private eventRepository: Repository<Evento>
  ) {}
  create(createEventDto: CreateEventDto): Promise<Evento> {
    const newEvent: Evento = this.eventRepository.create(createEventDto)
    return this.eventRepository.save(newEvent)
  }

  async findAll(): Promise<Evento[]> {
    const eventos: Evento[] = await this.eventRepository.find({
      relations: {
        association: true
      },
      select: {
        association: {
          id: true
        }
      }
    })
    if (eventos.length > 0) {
      return eventos
    }
    throw new NotFoundException('Events not found')
  }

  async findOne(id: number): Promise<Evento> {
    const event: Evento | null = await this.eventRepository.findOne({
      where: { id }
    })
    if (event) {
      return event
    }
    throw new NotFoundException('Event not found')
  }

  update(id: number, updateEventDto: UpdateEventDto): Promise<UpdateResult> {
    return this.eventRepository.update(id, updateEventDto)
  }

  remove(id: number): Promise<DeleteResult> {
    return this.eventRepository.delete(id)
  }
}
