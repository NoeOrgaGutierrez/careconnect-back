import { Inject, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { User } from './entities/user.entity'
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from './dto/login-user.dto'

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser: User = this.userRepository.create(createUserDto)
    const saltOrRounds = 10
    newUser.password = await bcrypt.hash(newUser.password, saltOrRounds)
    console.log(newUser.password)
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
  async login(user: LoginUserDto): Promise<User | null> {
    const userInDb = await this.userRepository.findOne({
      where: { email: user.email }
    })
    if (userInDb) {
      const isPasswordMatching = await bcrypt.compare(
        user.password,
        userInDb.password
      )
      if (isPasswordMatching) {
        return userInDb
      }
    }
    return null
  }
}
