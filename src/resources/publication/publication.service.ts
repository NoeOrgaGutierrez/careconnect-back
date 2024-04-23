import { Inject, Injectable } from '@nestjs/common'
import { CreatePublicationDto } from './dto/create-publication.dto'
import { UpdatePublicationDto } from './dto/update-publication.dto'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { Publication } from './entities/publication.entity'

@Injectable()
export class PublicationService {
  constructor(
    @Inject('PUBLICATION_REPOSITORY')
    private readonly publicationRepository: Repository<Publication>
  ) {}
  create(createPublicationDto: CreatePublicationDto): Promise<Publication> {
    const newPublicattion: Publication =
      this.publicationRepository.create(createPublicationDto)
    return this.publicationRepository.save(newPublicattion)
  }

  findAll(): Promise<Publication[]> {
    return this.publicationRepository.find()
  }

  findOne(id: number): Promise<Publication | null> {
    return this.publicationRepository.findOne({ where: { id } })
  }

  update(
    id: number,
    updatePublicationDto: UpdatePublicationDto
  ): Promise<UpdateResult> {
    return this.publicationRepository.update(id, updatePublicationDto)
  }

  remove(id: number): Promise<DeleteResult> {
    return this.publicationRepository.delete(id)
  }
}
