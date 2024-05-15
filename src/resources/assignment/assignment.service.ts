import { Inject, Injectable, NotFoundException } from '@nestjs/common'
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

  async findAll(): Promise<Assignment[]> {
    const assignments: Assignment[] = await this.assignmentRepository.find()
    if (assignments.length > 0) {
      return assignments
    }
    throw new NotFoundException('Assignments not found')
  }

  async findOne(id: number): Promise<Assignment> {
    const assignment: Assignment | null =
      await this.assignmentRepository.findOne({
        where: { id }
      })
    if (assignment) {
      return assignment
    }
    throw new NotFoundException('Assignment not found')
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
