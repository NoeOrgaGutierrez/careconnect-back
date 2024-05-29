import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { ValorationService } from './valoration.service'
import { CreateValorationDto } from './dto/create-valoration.dto'
import { UpdateValorationDto } from './dto/update-valoration.dto'
import { Valoration } from './entities/valoration.entity'
import { DeleteResult, UpdateResult } from 'typeorm'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
@ApiTags('Valoration')
@Controller('valoration')
export class ValorationController {
  constructor(private readonly valorationService: ValorationService) {}
  @ApiOperation({ summary: 'Create a valoration' })
  @Post()
  create(
    @Body() createValorationDto: CreateValorationDto
  ): Promise<Valoration> {
    return this.valorationService.create(createValorationDto)
  }
  @ApiOperation({ summary: 'Get all valorations' })
  @Get()
  findAll(): Promise<Valoration[]> {
    return this.valorationService.findAll()
  }
  @ApiOperation({ summary: 'Get a valoration by ID' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Valoration> {
    return this.valorationService.findOne(+id)
  }
  @ApiOperation({ summary: 'Update a valoration' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateValorationDto: UpdateValorationDto
  ): Promise<UpdateResult> {
    return this.valorationService.update(+id, updateValorationDto)
  }
  @ApiOperation({ summary: 'Delete a valoration' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.valorationService.remove(+id)
  }
  @ApiOperation({ summary: 'Get all valoration by user' })
  @Get('user/:id')
  findByUser(@Param('id') id: string) {
    return this.valorationService.getValorationByUser(+id)
  }
}
