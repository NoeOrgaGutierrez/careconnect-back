import { Inject, Injectable } from '@nestjs/common'
import { CreateAssignmentPermissionDto } from './dto/create-assignment-permission.dto'
import { UpdateAssignmentPermissionDto } from './dto/update-assignment-permission.dto'
import { AssignmentPermission } from './entities/assignment-permission.entity'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'

@Injectable()
export class AssignmentPermissionService {
  constructor(
    @Inject('ASSIGNMENT_PERMISSION_REPOSITORY')
    private readonly assignmentPermissionRepository: Repository<AssignmentPermission>
  ) {}
  create(
    createAssignmentPermissionDto: CreateAssignmentPermissionDto
  ): Promise<AssignmentPermission> {
    const newAssignmentPermission = this.assignmentPermissionRepository.create(
      createAssignmentPermissionDto
    )
    return this.assignmentPermissionRepository.save(newAssignmentPermission)
  }

  findAll(): Promise<AssignmentPermission[]> {
    return this.assignmentPermissionRepository.find()
  }

  findOne(id: number): Promise<AssignmentPermission | null> {
    return this.assignmentPermissionRepository.findOne({ where: { id } })
  }

  update(
    id: number,
    updateAssignmentPermissionDto: UpdateAssignmentPermissionDto
  ): Promise<UpdateResult> {
    return this.assignmentPermissionRepository.update(
      id,
      updateAssignmentPermissionDto
    )
  }

  remove(id: number): Promise<DeleteResult> {
    return this.assignmentPermissionRepository.delete(id)
  }
}
