import { Inject, Injectable } from '@nestjs/common'
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

  findAll(): Promise<Evento[]> {
    return this.eventRepository.find({
      relations: {
        association: true
      },
      select: {
        association: {
          id: true
        }
      }
    })
  }

  findOne(id: number): Promise<Evento | null> {
    return this.eventRepository.findOne({ where: { id } })
  }

  update(id: number, updateEventDto: UpdateEventDto): Promise<UpdateResult> {
    return this.eventRepository.update(id, updateEventDto)
  }

  remove(id: number): Promise<DeleteResult> {
    return this.eventRepository.delete(id)
  }
}
