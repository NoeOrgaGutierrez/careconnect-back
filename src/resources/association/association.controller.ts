import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { AssociationService } from './association.service'
import { CreateAssociationDto } from './dto/create-association.dto'
import { UpdateAssociationDto } from './dto/update-association.dto'
import { Association } from './entities/association.entity'
import { DeleteResult, UpdateResult } from 'typeorm'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
@ApiTags('Association')
@Controller('association')
export class AssociationController {
  constructor(private readonly associationService: AssociationService) {}
  @ApiOperation({ summary: 'Create an association' })
  @Post()
  create(
    @Body() createAssociationDto: CreateAssociationDto
  ): Promise<Association> {
    return this.associationService.create(createAssociationDto)
  }
  @ApiOperation({ summary: 'Get all associations' })
  @Get()
  findAll(): Promise<Association[]> {
    return this.associationService.findAll()
  }
  @ApiOperation({ summary: 'Get an association' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Association | null> {
    return this.associationService.findOne(+id)
  }
  @ApiOperation({ summary: 'Update an association' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssociationDto: UpdateAssociationDto
  ): Promise<UpdateResult> {
    return this.associationService.update(+id, updateAssociationDto)
  }
  @ApiOperation({ summary: 'Delete an association' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.associationService.remove(+id)
  }
}
