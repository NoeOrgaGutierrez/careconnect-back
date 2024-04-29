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
import { ApiOperation, ApiTags } from '@nestjs/swagger'
@ApiTags('Publication')
@Controller('publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}
  @ApiOperation({ summary: 'Create Publication' })
  @Post()
  create(
    @Body() createPublicationDto: CreatePublicationDto
  ): Promise<Publication> {
    return this.publicationService.create(createPublicationDto)
  }
  @ApiOperation({ summary: 'Get All Publications' })
  @Get()
  findAll(): Promise<Publication[]> {
    return this.publicationService.findAll()
  }
  @ApiOperation({ summary: 'Get One Publication' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Publication | null> {
    return this.publicationService.findOne(+id)
  }
  @ApiOperation({ summary: 'Update Publication' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePublicationDto: UpdatePublicationDto
  ): Promise<UpdateResult> {
    return this.publicationService.update(+id, updatePublicationDto)
  }
  @ApiOperation({ summary: 'Delete Publication' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.publicationService.remove(+id)
  }
}
