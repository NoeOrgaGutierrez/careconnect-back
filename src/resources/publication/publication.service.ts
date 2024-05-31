import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreatePublicationDto } from './dto/create-publication.dto'
import { UpdatePublicationDto } from './dto/update-publication.dto'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { Publication } from './entities/publication.entity'
import { Comment } from 'src/resources/comment/entities/comment.entity'

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
          id: true,
          name: true,
          surname: true,
          avatar: true
        },
        topic: {
          id: true,
          name: true,
          description: true
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
  async getPostsByTopicId(topicId: number): Promise<Publication[]> {
    const publication: Publication[] = await this.publicationRepository.find({
      relations: { topic: true },
      where: { topic: { id: topicId } }
    })
    if (publication.length > 0) {
      return publication
    }
    throw new NotFoundException('Publications not found')
  }
  async getPostCommentsByPublicationId(publicationId: number) {
    const publication = await this.publicationRepository
      .createQueryBuilder('publication')
      .leftJoinAndSelect('publication.comments', 'comment')
      .leftJoinAndSelect('comment.user', 'user')
      .leftJoinAndSelect('comment.parentComment', 'parentComment')
      .where('publication.id = :publicationId', { publicationId })
      .getOne()

    if (!publication) {
      throw new NotFoundException('Publication not found')
    }

    const comments = publication.comments

    const nestComments = (comments: Comment[]): Comment[] => {
      const commentMap = new Map<number, Comment>()

      comments.forEach((comment) => {
        comment.comments = [] // Inicializa un array de comentarios anidados
        commentMap.set(comment.id, comment)
      })

      const nestedComments: Comment[] = []

      comments.forEach((comment) => {
        if (comment.parentComment) {
          const parent = commentMap.get(comment.parentComment.id)
          if (parent) {
            parent.comments.push(comment)
          }
        } else {
          nestedComments.push(comment)
        }
      })

      return nestedComments
    }

    return nestComments(comments)
  }
}
