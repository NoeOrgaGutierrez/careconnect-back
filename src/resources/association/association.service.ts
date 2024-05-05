import { Inject, Injectable } from '@nestjs/common'
import { CreateAssociationDto } from './dto/create-association.dto'
import { UpdateAssociationDto } from './dto/update-association.dto'
import { Association } from './entities/association.entity'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { LoginAssociationDto } from './dto/login-association.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AssociationService {
  constructor(
    @Inject('ASSOCIATION_REPOSITORY')
    private readonly associationRepository: Repository<Association>
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
  async login(association: LoginAssociationDto): Promise<Association | null> {
    const associationInDb = await this.associationRepository.findOne({
      where: { name: association.loginCode }
    })
    if (associationInDb) {
      const isPasswordMatching = await bcrypt.compare(
        association.password,
        associationInDb.password
      )
      if (isPasswordMatching) {
        return associationInDb
      }
    }
    return null
  }
}
