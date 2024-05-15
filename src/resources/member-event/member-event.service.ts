import { Inject, Injectable, NotFoundException } from '@nestjs/common'
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

  async findAll(): Promise<MemberEvent[]> {
    const memberEvents: MemberEvent[] = await this.memberEventRepository.find({
      relations: {
        evento: true,
        userAssociation: true
      },
      select: {
        id: true,
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
    if (memberEvents.length > 0) {
      return memberEvents
    }
    throw new NotFoundException('MemberEvents not found')
  }

  async findOne(id: number): Promise<MemberEvent> {
    const memberEvent: MemberEvent | null =
      await this.memberEventRepository.findOne({
        where: { id },
        relations: {
          evento: true,
          userAssociation: true
        },
        select: {
          id: true,
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
    if (memberEvent) {
      return memberEvent
    }
    throw new NotFoundException('MemberEvent not found')
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
