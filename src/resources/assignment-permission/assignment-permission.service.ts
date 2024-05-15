import { Inject, Injectable, NotFoundException } from '@nestjs/common'
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

  async findAll(): Promise<AssignmentPermission[]> {
    const assignmentPermissions: AssignmentPermission[] =
      await this.assignmentPermissionRepository.find({
        relations: { assignment: true, permission: true },
        select: {
          id: true,
          assignment: { id: true, name: true },
          permission: { id: true, name: true }
        }
      })
    if (assignmentPermissions.length > 0) {
      return assignmentPermissions
    }
    throw new NotFoundException('Permissions not found')
  }

  async findOne(id: number): Promise<AssignmentPermission> {
    const assignmentPermission: AssignmentPermission | null =
      await this.assignmentPermissionRepository.findOne({
        where: { id },
        relations: { assignment: true, permission: true },
        select: {
          id: true,
          assignment: { id: true, name: true },
          permission: { id: true, name: true }
        }
      })
    if (assignmentPermission) {
      return assignmentPermission
    }
    throw new NotFoundException('Assignment Permission not found')
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
