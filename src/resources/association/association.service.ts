import {
  BadRequestException,
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
import { Blog } from '../blog/entities/blog.entity'
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
    const association: Association | null =
      await this.associationRepository.findOne({
        where: { id },
        relations: {
          faq: true,
          members: {
            user: true
          },
          blogs: true
        }
      })
    if (association) {
      return association
    }
    throw new NotFoundException(`Association with ID ${id} not found`)
  }
  async filter(
    associationName: string,
    memberCount: string
  ): Promise<Association[]> {
    if (memberCount && isNaN(Number(memberCount))) {
      throw new BadRequestException('memberCount must be a number')
    }
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

    if (memberCount) {
      query.leftJoin('association.members', 'member')
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
  async getBlogs(id: number): Promise<Blog[]> {
    const query = this.associationRepository
      .createQueryBuilder('association')
      .select(['blog.id', 'blog.name', 'blog.description'])
      .innerJoin('association.blogs', 'blog')
      .where('association.id = :id', { id })
    const result: Blog[] = await query.getRawMany()
    if (result.length > 0) {
      return result
    }

    throw new NotFoundException('This association has no blogs')
  }
}
