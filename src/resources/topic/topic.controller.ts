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
import { TopicService } from './topic.service'
import { CreateTopicDto } from './dto/create-topic.dto'
import { UpdateTopicDto } from './dto/update-topic.dto'
import { Topic } from './entities/topic.entity'
import { DeleteResult, UpdateResult } from 'typeorm'
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
@ApiTags('Topic')
@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}
  @ApiOperation({ summary: 'Create a topic' })
  @Post()
  create(@Body() createTopicDto: CreateTopicDto): Promise<Topic> {
    return this.topicService.create(createTopicDto)
  }
  @ApiOperation({ summary: 'Get all topics' })
  @Get()
  findAll(): Promise<Topic[]> {
    return this.topicService.findAll()
  }
  @ApiOperation({ summary: 'Get a topic' })
  @Get('filter/:id')
  findOne(@Param('id') id: string): Promise<Topic | null> {
    return this.topicService.findOne(+id)
  }
  @ApiOperation({ summary: 'Get filtered topics' })
  @ApiQuery({ name: 'topicName', required: false, type: String })
  @ApiQuery({ name: 'commentCount', required: true, type: Number })
  @Get('filter')
  filter(
    @Query('topicName') topicName: string,
    @Query('commentCount') commentCount: string
  ): Promise<Topic[]> {
    return this.topicService.filter(topicName, +commentCount)
  }
  @ApiOperation({ summary: 'Update a topic' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTopicDto: UpdateTopicDto
  ): Promise<UpdateResult> {
    return this.topicService.update(+id, updateTopicDto)
  }
  @ApiOperation({ summary: 'Delete a topic' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.topicService.remove(+id)
  }
}
