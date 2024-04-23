import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { TopicService } from './topic.service'
import { CreateTopicDto } from './dto/create-topic.dto'
import { UpdateTopicDto } from './dto/update-topic.dto'
import { Topic } from './entities/topic.entity'
import { DeleteResult, UpdateResult } from 'typeorm'

@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post()
  create(@Body() createTopicDto: CreateTopicDto): Promise<Topic> {
    return this.topicService.create(createTopicDto)
  }

  @Get()
  findAll(): Promise<Topic[]> {
    return this.topicService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Topic | null> {
    return this.topicService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTopicDto: UpdateTopicDto
  ): Promise<UpdateResult> {
    return this.topicService.update(+id, updateTopicDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.topicService.remove(+id)
  }
}
