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
import { ApiOperation, ApiTags } from '@nestjs/swagger'
@ApiTags('UserAssociation')
@Controller('user-association')
export class UserAssociationController {
  constructor(
    private readonly userAssociationService: UserAssociationService
  ) {}
  @ApiOperation({ summary: 'Create a new member of an association' })
  @Post()
  create(
    @Body() createUserAssociationDto: CreateUserAssociationDto
  ): Promise<UserAssociation> {
    return this.userAssociationService.create(createUserAssociationDto)
  }
  @ApiOperation({ summary: 'Get all members of an association' })
  @Get()
  findAll(): Promise<UserAssociation[]> {
    return this.userAssociationService.findAll()
  }
  @ApiOperation({ summary: 'Get one member of an association' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserAssociation | null> {
    return this.userAssociationService.findOne(+id)
  }
  @ApiOperation({ summary: 'Get all associations of a member' })
  @Get('user/:id')
  findJoinedAssociations(@Param('id') id: string): Promise<UserAssociation[]> {
    return this.userAssociationService.findJoinedAssociations(+id)
  }
  @ApiOperation({ summary: 'Update a member of an association' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserAssociationDto: UpdateUserAssociationDto
  ): Promise<UpdateResult> {
    return this.userAssociationService.update(+id, updateUserAssociationDto)
  }
  @ApiOperation({ summary: 'Delete a member of an association' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.userAssociationService.remove(+id)
  }
  @ApiOperation({ summary: 'Delete a member onf an assocaition by both ids' })
  @Delete('user/:userId/association/:associationId')
  removeByBothIds(
    @Param('userId') userId: number,
    @Param('associationId') associationId: number
  ): Promise<DeleteResult> {
    return this.userAssociationService.removeByBothIds(userId, associationId)
  }
}
