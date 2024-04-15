import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { UserAssociationService } from './user-association.service'
import { CreateUserAssociationDto } from './dto/create-user-association.dto'
import { UpdateUserAssociationDto } from './dto/update-user-association.dto'
import { UserAssociation } from './entities/user-association.entity'
import { DeleteResult, UpdateResult } from 'typeorm'

@Controller('user-association')
export class UserAssociationController {
  constructor(
    private readonly userAssociationService: UserAssociationService
  ) {}

  @Post()
  create(
    @Body() createUserAssociationDto: CreateUserAssociationDto
  ): Promise<UserAssociation> {
    return this.userAssociationService.create(createUserAssociationDto)
  }

  @Get()
  findAll(): Promise<UserAssociation[]> {
    return this.userAssociationService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserAssociation | null> {
    return this.userAssociationService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserAssociationDto: UpdateUserAssociationDto
  ): Promise<UpdateResult> {
    return this.userAssociationService.update(+id, updateUserAssociationDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.userAssociationService.remove(+id)
  }
}
