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
    return this.memberEventRepository.find({
      relations: {
        evento: true,
        userAssociation: true
      },
      select: {
        evento: {
          id: true,
          association: {
            id: true
          },
          description: true,
          dateStart: true,
          dateEnd: true
        },
        userAssociation: {
          id: true,
          association: {
            id: true
          },
          user: {
            id: true
          }
        }
      }
    })
  }

  findOne(id: number): Promise<MemberEvent | null> {
    return this.memberEventRepository.findOne({
      where: { id },
      relations: {
        evento: true,
        userAssociation: true
      },
      select: {
        evento: {
          id: true,
          association: {
            id: true
          },
          description: true,
          dateStart: true,
          dateEnd: true
        },
        userAssociation: {
          id: true,
          association: {
            id: true
          },
          user: {
            id: true
          }
        }
      }
    })
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
