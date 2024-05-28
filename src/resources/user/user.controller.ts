import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { DeleteResult, UpdateResult } from 'typeorm'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { LoginUserDto } from './dto/login-user.dto'
import { BlogComment } from '../blog-comment/entities/blog-comment.entity'
import { Blog } from '../blog/entities/blog.entity'
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiOperation({ summary: 'Create an user' })
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto)
  }
  @ApiOperation({ summary: 'Get all users' })
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll()
  }
  @ApiOperation({ summary: 'Get an user' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User | null> {
    return this.userService.findOne(+id)
  }
  @ApiOperation({ summary: 'Update an user' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UpdateResult> {
    return this.userService.update(+id, updateUserDto)
  }
  @ApiOperation({ summary: 'Delete an user' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.userService.remove(+id)
  }
  @ApiOperation({ summary: 'Login an user' })
  @Post('login')
  login(@Body() user: LoginUserDto): Promise<User | null> {
    return this.userService.login(user)
  }
  @ApiOperation({ summary: 'Get latest comments' })
  @Get('latest-comments/:userId')
  getLatestComments(@Param('userId') userId: number): Promise<BlogComment[]> {
    return this.userService.getLatestComments(userId)
  }
  @ApiOperation({ summary: 'Get pinned blogs' })
  @Get('pinned-blogs/:userId')
  getPinnedBlogs(@Param('userId') userId: string): Promise<Blog[]> {
    console.log(userId)
    return this.userService.getPinnedBlogs(+userId)
  }
}
