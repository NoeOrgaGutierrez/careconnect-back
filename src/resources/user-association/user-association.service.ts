import { Inject, Injectable, NotFoundException } from '@nestjs/common'
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
}
