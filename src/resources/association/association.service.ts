import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common'
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
  async create(
    createAssociationDto: CreateAssociationDto
  ): Promise<Association> {
    const existingAssociation = await this.associationRepository.findOne({
      where: { loginCode: createAssociationDto.loginCode }
    })
    if (existingAssociation) {
      throw new ForbiddenException('Login code already exists')
    }
    const newAssociation: Association =
      this.associationRepository.create(createAssociationDto)
    const saltOrRounds = 10
    newAssociation.password = await bcrypt.hash(
      newAssociation.password,
      saltOrRounds
    )
    return this.associationRepository.save(newAssociation)
  }
  async findAll(): Promise<Association[]> {
    const associations: Association[] = await this.associationRepository.find()
    if (associations.length > 0) {
      return associations
    }
    throw new NotFoundException('Associations not found')
  }

  async findOne(id: number): Promise<Association> {
    const association = await this.associationRepository.findOne({
      where: { id },
      relations: {
        blogs: true,
        members: {
          user: true
        },
        faq: true
      },
      select: {
        members: {
          id: true,
          user: {
            id: true,
            email: true,
            name: true,
            surname: true,
            password: false
          }
        }
      }
    })
    if (!association) {
      throw new NotFoundException('Association not found')
    }
    return association
  }
  async filter(
    associationName: string,
    memberCount: number
  ): Promise<Association[]> {
    const query = this.associationRepository.createQueryBuilder('association')

    if (associationName) {
      query.orWhere('UPPER(association.name) like UPPER(:name)', {
        name: '%' + associationName + '%'
      })
      query.leftJoinAndSelect('association.blogs', 'blog')
      query.orWhere('UPPER(blog.name) like UPPER(:blogName)', {
        blogName: '%' + associationName + '%'
      })
    }

    if (memberCount !== 0) {
      query.groupBy('association.id')
      query.having('COUNT(member.id) >= :memberCount', {
        memberCount: memberCount
      })
    }

    const result = await query.getMany()
    if (result.length > 0) {
      return result
    }
    throw new NotFoundException('Associations not found')
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
  async login(association: LoginAssociationDto): Promise<Association> {
    const associationInDb = await this.associationRepository.findOne({
      where: { loginCode: association.loginCode }
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
    throw new NotFoundException('Invalid credentials')
  }
}
