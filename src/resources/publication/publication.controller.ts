import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { PublicationService } from './publication.service'
import { CreatePublicationDto } from './dto/create-publication.dto'
import { UpdatePublicationDto } from './dto/update-publication.dto'
import { Publication } from './entities/publication.entity'
import { DeleteResult, UpdateResult } from 'typeorm'

@Controller('publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Post()
  create(
    @Body() createPublicationDto: CreatePublicationDto
  ): Promise<Publication> {
    return this.publicationService.create(createPublicationDto)
  }

  @Get()
  findAll(): Promise<Publication[]> {
    return this.publicationService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Publication | null> {
    return this.publicationService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePublicationDto: UpdatePublicationDto
  ): Promise<UpdateResult> {
    return this.publicationService.update(+id, updatePublicationDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.publicationService.remove(+id)
  }
}
