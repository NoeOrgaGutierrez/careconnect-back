import { Inject, Injectable } from '@nestjs/common'
import { CreateUserAssociationDto } from './dto/create-user-association.dto'
import { UpdateUserAssociationDto } from './dto/update-user-association.dto'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { UserAssociation } from './entities/user-association.entity'

@Injectable()
export class UserAssociationService {
  constructor(
    @Inject('USER_ASSOCIATION_REPOSITORY')
    private readonly userAssociationRepository: Repository<UserAssociation>
  ) {}
  create(
    createUserAssociationDto: CreateUserAssociationDto
  ): Promise<UserAssociation> {
    const newUserAssociation: UserAssociation =
      this.userAssociationRepository.create(createUserAssociationDto)
    return this.userAssociationRepository.save(newUserAssociation)
  }

  findAll(): Promise<UserAssociation[]> {
    return this.userAssociationRepository.find()
  }

  findOne(id: number): Promise<UserAssociation | null> {
    return this.userAssociationRepository.findOne({ where: { id } })
  }

  update(
    id: number,
    updateUserAssociationDto: UpdateUserAssociationDto
  ): Promise<UpdateResult> {
    return this.userAssociationRepository.update(id, updateUserAssociationDto)
  }

  remove(id: number): Promise<DeleteResult> {
    return this.userAssociationRepository.delete(id)
  }
}
