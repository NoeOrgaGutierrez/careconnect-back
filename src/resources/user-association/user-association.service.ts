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

  async findAll(): Promise<UserAssociation[]> {
    return await this.userAssociationRepository.find({
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
  }

  async findOne(id: number): Promise<UserAssociation | null> {
    const result = await this.userAssociationRepository.findOne({
      where: { id },
      relations: {
        user: true,
        association: true
      },
      select: {
        user: {
          id: true,
          email: true,
          name: true,
          password: false,
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
    console.log(result)
    return result
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
