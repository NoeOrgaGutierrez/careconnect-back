import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { PinService } from './pin.service'
import { CreatePinDto } from './dto/create-pin.dto'
import { UpdatePinDto } from './dto/update-pin.dto'
import { Pin } from './entities/pin.entity'
import { DeleteResult, UpdateResult } from 'typeorm'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
@ApiTags('Pin')
@Controller('pin')
export class PinController {
  constructor(private readonly pinService: PinService) {}
  @ApiOperation({ summary: 'Create a new pin' })
  @Post()
  create(@Body() createPinDto: CreatePinDto): Promise<Pin> {
    return this.pinService.create(createPinDto)
  }
  @ApiOperation({ summary: 'Get all pins' })
  @Get()
  findAll(): Promise<Pin[]> {
    return this.pinService.findAll()
  }
  @ApiOperation({ summary: 'Get a single pin' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Pin> {
    return this.pinService.findOne(+id)
  }
  @ApiOperation({ summary: 'Update a pin' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePinDto: UpdatePinDto
  ): Promise<UpdateResult> {
    return this.pinService.update(+id, updatePinDto)
  }
  @ApiOperation({ summary: 'Delete a pin' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.pinService.remove(+id)
  }
}
