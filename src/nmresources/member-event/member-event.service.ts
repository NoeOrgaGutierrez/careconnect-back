import { Inject, Injectable } from '@nestjs/common'
import { CreateMemberEventDto } from './dto/create-member-event.dto'
import { UpdateMemberEventDto } from './dto/update-member-event.dto'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { MemberEvent } from './entities/member-event.entity'

@Injectable()
export class MemberEventService {
  constructor(
    @Inject('MEMBER_EVENT_REPOSITORY')
    private readonly memberEventRepository: Repository<MemberEvent>
  ) {}
  create(createMemberEventDto: CreateMemberEventDto): Promise<MemberEvent> {
    const newMemberEvent: MemberEvent =
      this.memberEventRepository.create(createMemberEventDto)
    return this.memberEventRepository.save(newMemberEvent)
  }

  findAll(): Promise<MemberEvent[]> {
    return this.memberEventRepository.find()
  }

  findOne(id: number): Promise<MemberEvent | null> {
    return this.memberEventRepository.findOne({ where: { id } })
  }

  update(
    id: number,
    updateMemberEventDto: UpdateMemberEventDto
  ): Promise<UpdateResult> {
    return this.memberEventRepository.update(id, updateMemberEventDto)
  }

  remove(id: number): Promise<DeleteResult> {
    return this.memberEventRepository.delete(id)
  }
}
