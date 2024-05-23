import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { FaqService } from './faq.service'
import { CreateFaqDto } from './dto/create-faq.dto'
import { UpdateFaqDto } from './dto/update-faq.dto'
import { Faq } from './entities/faq.entity'
import { DeleteResult, UpdateResult } from 'typeorm'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
@ApiTags('Faq')
@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}
  @ApiOperation({ summary: 'Create a FAQ' })
  @Post()
  create(@Body() createFaqDto: CreateFaqDto): Promise<Faq> {
    return this.faqService.create(createFaqDto)
  }
  @ApiOperation({ summary: 'Get a FAQ' })
  @Get()
  findAll(): Promise<Faq[]> {
    return this.faqService.findAll()
  }
  @ApiOperation({ summary: 'Get a FAQ by ID' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Faq> {
    return this.faqService.findOne(+id)
  }
  @ApiOperation({ summary: 'Update a FAQ' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFaqDto: UpdateFaqDto
  ): Promise<UpdateResult> {
    return this.faqService.update(+id, updateFaqDto)
  }
  @ApiOperation({ summary: 'Delete a FAQ' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.faqService.remove(+id)
  }
}
