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

@Controller('association')
export class AssociationController {
  constructor(private readonly associationService: AssociationService) {}

  @Post()
  create(
    @Body() createAssociationDto: CreateAssociationDto
  ): Promise<Association> {
    return this.associationService.create(createAssociationDto)
  }

  @Get()
  findAll(): Promise<Association[]> {
    return this.associationService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Association | null> {
    return this.associationService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssociationDto: UpdateAssociationDto
  ): Promise<UpdateResult> {
    return this.associationService.update(+id, updateAssociationDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.associationService.remove(+id)
  }
}
