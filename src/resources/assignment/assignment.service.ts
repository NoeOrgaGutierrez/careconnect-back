import { Inject, Injectable } from '@nestjs/common'
import { CreateAssignmentDto } from './dto/create-assignment.dto'
import { UpdateAssignmentDto } from './dto/update-assignment.dto'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { Assignment } from './entities/assignment.entity'

@Injectable()
export class AssignmentService {
  constructor(
    @Inject('ASSIGNMENT_REPOSITORY')
    private readonly assignmentRepository: Repository<Assignment>
  ) {}
  create(createAssignmentDto: CreateAssignmentDto): Promise<Assignment> {
    const newAssignment = this.assignmentRepository.create(createAssignmentDto)
    return this.assignmentRepository.save(newAssignment)
  }

  findAll(): Promise<Assignment[]> {
    return this.assignmentRepository.find()
  }

  findOne(id: number): Promise<Assignment | null> {
    return this.assignmentRepository.findOne({ where: { id } })
  }

  update(
    id: number,
    updateAssignmentDto: UpdateAssignmentDto
  ): Promise<UpdateResult> {
    return this.assignmentRepository.update(id, updateAssignmentDto)
  }

  remove(id: number): Promise<DeleteResult> {
    return this.assignmentRepository.delete(id)
  }
}
