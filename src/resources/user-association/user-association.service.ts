import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserAssociationDto } from './dto/create-user-association.dto'
import { UpdateUserAssociationDto } from './dto/update-user-association.dto'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { UserAssociation } from './entities/user-association.entity'
import { BlogComment } from '../blog-comment/entities/blog-comment.entity'
import { Valoration } from '../valoration/entities/valoration.entity'
import { Pin } from '../pin/entities/pin.entity'

@Injectable()
export class UserAssociationService {
  constructor(
    @Inject('USER_ASSOCIATION_REPOSITORY')
    private readonly userAssociationRepository: Repository<UserAssociation>,
    @Inject('BLOG_COMMENT_REPOSITORY')
    private readonly blogCommentRepository: Repository<BlogComment>,
    @Inject('VALORATION_REPOSITORY')
    private readonly valorationRepository: Repository<Valoration>,
    @Inject('PIN_REPOSITORY')
    private readonly pinRepository: Repository<Pin>
  ) {}
  async create(
    createUserAssociationDto: CreateUserAssociationDto
  ): Promise<UserAssociation> {
    const newUserAssociation: UserAssociation =
      this.userAssociationRepository.create(createUserAssociationDto)
    await this.userAssociationRepository.save(newUserAssociation)
    return this.findOne(newUserAssociation.id)
  }

  async findAll(): Promise<UserAssociation[]> {
    const userAssociations: UserAssociation[] =
      await this.userAssociationRepository.find({
        relations: {
          user: true,
          association: true
        },
        select: {
          user: {
            id: true,
            email: false,
            name: false,
            password: false,
            surname: false
          },
          association: {
            id: true,
            name: false,
            banner: false,
            description: false,
            logo: false,
            miniDescription: false
          }
        }
      })
    if (userAssociations.length > 0) {
      return userAssociations
    }
    throw new NotFoundException('UserAssociations not found')
  }

  async findOne(id: number): Promise<UserAssociation> {
    const userAssociation: UserAssociation | null =
      await this.userAssociationRepository.findOne({
        where: { id },
        relations: {
          user: true,
          association: true
        },
        select: {
          id: true,
          user: {
            id: true,
            email: true,
            name: true,
            surname: true
          },
          association: {
            id: true,
            name: true,
            banner: true,
            description: true,
            logo: true,
            miniDescription: true
          }
        }
      })
    if (userAssociation) {
      return userAssociation
    }
    throw new NotFoundException('UserAssociation not found')
  }

  async findJoinedAssociations(id: number): Promise<UserAssociation[]> {
    const userAssociations: UserAssociation[] =
      await this.userAssociationRepository.find({
        where: { user: { id } },
        relations: { association: true },
        select: {
          id: true,
          association: {
            id: true,
            name: true,
            banner: true,
            description: true,
            logo: true,
            miniDescription: true
          }
        }
      })
    if (userAssociations.length > 0) {
      return userAssociations
    }
    throw new NotFoundException('This user is not signed to any associations')
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
  async removeByBothIds(
    userId: number,
    associationId: number
  ): Promise<DeleteResult> {
    const member: UserAssociation | null =
      await this.userAssociationRepository.findOne({
        where: { user: { id: userId }, association: { id: associationId } }
      })
    if (member) {
      console.log('El miembro existe')
      // Borro las valoraciones del miembro
      await this.valorationRepository.delete({
        userAssociation: { id: member.id }
      })
      console.log('Lo he borrado de valoration')
      // Busco todos los comentarios que ha publicado el miembro
      await this.blogCommentRepository.delete({
        member: { id: member.id }
      })
      console.log('Lo he borrado de comentarios de blog')
      await this.pinRepository.delete({ member: { id: member.id } })
      console.log('Lo he borrado de los pines')
      return this.userAssociationRepository.delete({ id: member.id })
    } else {
      throw new NotFoundException('Member not found')
    }
  }
}
