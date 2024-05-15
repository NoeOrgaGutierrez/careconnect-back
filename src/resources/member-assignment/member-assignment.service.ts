import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreateMemberAssignmentDto } from './dto/create-member-assignment.dto'
import { UpdateMemberAssignmentDto } from './dto/update-member-assignment.dto'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { MemberAssignment } from './entities/member-assignment.entity'

@Injectable()
export class MemberAssignmentService {
  constructor(
    @Inject('MEMBER_ASSIGNMENT_REPOSITORY')
    private readonly memberAssignmentRepository: Repository<MemberAssignment>
  ) {}
  create(
    createMemberAssignmentDto: CreateMemberAssignmentDto
  ): Promise<MemberAssignment> {
    const newMemberAssignment = this.memberAssignmentRepository.create(
      createMemberAssignmentDto
    )
    return this.memberAssignmentRepository.save(newMemberAssignment)
  }

  async findAll(): Promise<MemberAssignment[]> {
    const memberAssignments: MemberAssignment[] =
      await this.memberAssignmentRepository.find({
        relations: {
          member: true,
          assignment: true
        },
        select: {
          id: true,
          member: {
            id: true,
            user: {
              id: true
            }
          },
          assignment: {
            id: true
          }
        }
      })
    if (memberAssignments.length > 0) {
      return memberAssignments
    }
    throw new NotFoundException('Member Assignments not found')
  }

  async findOne(id: number): Promise<MemberAssignment> {
    const memberAssignment: MemberAssignment | null =
      await this.memberAssignmentRepository.findOne({
        where: { id },
        relations: {
          member: true,
          assignment: true
        },
        select: {
          id: true,
          member: {
            id: true,
            user: {
              id: true
            }
          },
          assignment: {
            id: true
          }
        }
      })
    if (memberAssignment) {
      return memberAssignment
    }
    throw new NotFoundException('Member Assignment not found')
  }

  update(
    id: number,
    updateMemberAssignmentDto: UpdateMemberAssignmentDto
  ): Promise<UpdateResult> {
    return this.memberAssignmentRepository.update(id, updateMemberAssignmentDto)
  }

  remove(id: number): Promise<DeleteResult> {
    return this.memberAssignmentRepository.delete(id)
  }
}
