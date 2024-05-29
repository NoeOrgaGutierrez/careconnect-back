import { Inject, Injectable } from '@nestjs/common'
import { CreateValorationDto } from './dto/create-valoration.dto'
import { UpdateValorationDto } from './dto/update-valoration.dto'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { Valoration } from './entities/valoration.entity'

@Injectable()
export class ValorationService {
  constructor(
    @Inject('VALORATION_REPOSITORY')
    private valorationRepository: Repository<Valoration>
  ) {}
  async create(createValorationDto: CreateValorationDto): Promise<Valoration> {
    // CHECK IF IT EXISTS, IF IT DOES, DELETE IT
    const existingValoration = await this.valorationRepository.findOne({
      where: {
        userAssociation: createValorationDto.userAssociation,
        blogComment: createValorationDto.blogComment
      }
    })
    if (existingValoration) {
      await this.remove(existingValoration.id)
    }
    const newValoration = this.valorationRepository.create(createValorationDto)
    return this.valorationRepository.save(newValoration)
  }

  async findAll(): Promise<Valoration[]> {
    const valorations: Valoration[] = await this.valorationRepository.find()
    if (valorations.length > 0) {
      return valorations
    }
    throw new Error('Valoration not found')
  }

  async findOne(id: number): Promise<Valoration> {
    const valoration: Valoration | null =
      await this.valorationRepository.findOne({
        where: { id }
      })
    if (valoration) {
      return valoration
    }
    throw new Error('Valoration not found')
  }

  update(
    id: number,
    updateValorationDto: UpdateValorationDto
  ): Promise<UpdateResult> {
    return this.valorationRepository.update(id, updateValorationDto)
  }

  remove(id: number): Promise<DeleteResult> {
    return this.valorationRepository.delete(id)
  }
}
