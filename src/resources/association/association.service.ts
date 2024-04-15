import { Inject, Injectable } from '@nestjs/common'
import { CreateAssociationDto } from './dto/create-association.dto'
import { UpdateAssociationDto } from './dto/update-association.dto'
import { Association } from './entities/association.entity'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'

@Injectable()
export class AssociationService {
  constructor(
    @Inject('ASSOCIATION_REPOSITORY')
    private associationRepository: Repository<Association>
  ) {}
  create(createAssociationDto: CreateAssociationDto): Promise<Association> {
    const newAssociation: Association =
      this.associationRepository.create(createAssociationDto)
    return this.associationRepository.save(newAssociation)
  }
  findAll(): Promise<Association[]> {
    return this.associationRepository.find()
  }

  findOne(id: number): Promise<Association | null> {
    return this.associationRepository.findOne({ where: { id } })
  }

  update(
    id: number,
    updateAssociationDto: UpdateAssociationDto
  ): Promise<UpdateResult> {
    return this.associationRepository.update(id, updateAssociationDto)
  }

  remove(id: number): Promise<DeleteResult> {
    return this.associationRepository.delete(id)
  }
}
