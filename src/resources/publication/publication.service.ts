import { Inject, Injectable, NotFoundException } from '@nestjs/common'
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

  async findAll(): Promise<Publication[]> {
    const publications: Publication[] = await this.publicationRepository.find({
      relations: {
        user: true,
        topic: true
      },
      select: {
        user: {
          id: true
        },
        topic: {
          id: true
        }
      }
    })
    if (publications.length > 0) {
      return publications
    }
    throw new NotFoundException('Publications not found')
  }

  async findOne(id: number): Promise<Publication> {
    const publication: Publication | null =
      await this.publicationRepository.findOne({
        where: { id },
        relations: {
          user: true,
          topic: true
        },
        select: {
          user: {
            id: true
          },
          topic: {
            id: true
          }
        }
      })
    if (publication) {
      return publication
    }
    throw new NotFoundException('Publication not found')
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
