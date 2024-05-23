import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query
} from '@nestjs/common'
import { AssociationService } from './association.service'
import { CreateAssociationDto } from './dto/create-association.dto'
import { UpdateAssociationDto } from './dto/update-association.dto'
import { Association } from './entities/association.entity'
import { DeleteResult, UpdateResult } from 'typeorm'
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
import { LoginAssociationDto } from './dto/login-association.dto'
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
  @Get('findOne/:id')
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
  @ApiOperation({ summary: 'Login an association' })
  @Post('login')
  login(@Body() association: LoginAssociationDto): Promise<Association | null> {
    return this.associationService.login(association)
  }
  @ApiOperation({ summary: 'Get filtered associations' })
  @ApiQuery({ name: 'associationName', required: false, type: String })
  @ApiQuery({ name: 'memberCount', required: false, type: Number })
  @Get('filter')
  filter(
    @Query('associationName') associationName: string,
    @Query('memberCount') memberCount: string
  ): Promise<Association[]> {
    return this.associationService.filter(associationName, memberCount)
  }
}
