import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common'
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
    createUserDto.email = createUserDto.email.toLowerCase()
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email }
    })
    if (existingUser) {
      throw new ForbiddenException('Email already exists')
    }
    const newUser: User = this.userRepository.create(createUserDto)
    const saltOrRounds = 10
    newUser.password = await bcrypt.hash(newUser.password, saltOrRounds)
    console.log(newUser.password)
    return this.userRepository.save(newUser)
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await this.userRepository.find()
    if (users.length > 0) {
      return users
    }
    throw new NotFoundException('Users not found')
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } })
    if (user) {
      return user
    } else {
      throw new NotFoundException('User not found')
    }
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
    throw new NotFoundException('User not found')
  }
}
