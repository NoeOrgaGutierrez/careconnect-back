import { Inject, Injectable } from '@nestjs/common'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { UserEvent } from './entities/user-event.entity'
import { CreateUserEventDto } from './dto/create-user-event.dto'
import { UpdateUserEventDto } from './dto/update-user-event.dto'

@Injectable()
export class UserEventService {
  constructor(
    @Inject('USER_EVENT_REPOSITORY')
    private readonly dayRepository: Repository<UserEvent>
  ) {}
  create(createUserEventDto: CreateUserEventDto): Promise<UserEvent> {
    const newUserEvent: UserEvent =
      this.dayRepository.create(createUserEventDto)
    return this.dayRepository.save(newUserEvent)
  }

  findAll(): Promise<UserEvent[]> {
    return this.dayRepository.find()
  }

  findOne(id: number): Promise<UserEvent | null> {
    return this.dayRepository.findOne({ where: { id } })
  }

  update(
    id: number,
    updateUserEventDto: UpdateUserEventDto
  ): Promise<UpdateResult> {
    return this.dayRepository.update(id, updateUserEventDto)
  }

  remove(id: number): Promise<DeleteResult> {
    return this.dayRepository.delete(id)
  }
}
