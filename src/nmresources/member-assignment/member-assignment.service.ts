import { Inject, Injectable } from '@nestjs/common'
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

  findAll(): Promise<MemberAssignment[]> {
    return this.memberAssignmentRepository.find()
  }

  findOne(id: number): Promise<MemberAssignment | null> {
    return this.memberAssignmentRepository.findOne({ where: { id } })
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
