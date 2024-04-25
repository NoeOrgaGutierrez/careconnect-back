import { Inject, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser: User = this.userRepository.create(createUserDto)
    return this.userRepository.save(newUser)
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } })
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.userRepository.update(id, updateUserDto)
  }

  remove(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id)
  }
}
