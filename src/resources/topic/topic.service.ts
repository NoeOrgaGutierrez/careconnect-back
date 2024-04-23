import { Inject, Injectable } from '@nestjs/common'
import { CreateTopicDto } from './dto/create-topic.dto'
import { UpdateTopicDto } from './dto/update-topic.dto'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { Topic } from './entities/topic.entity'

@Injectable()
export class TopicService {
  constructor(
    @Inject('TOPIC_REPOSITORY')
    private readonly topicRepository: Repository<Topic>
  ) {}
  create(createTopicDto: CreateTopicDto): Promise<Topic> {
    const newTopic = this.topicRepository.create(createTopicDto)
    return this.topicRepository.save(newTopic)
  }

  findAll(): Promise<Topic[]> {
    return this.topicRepository.find()
  }

  findOne(id: number): Promise<Topic | null> {
    return this.topicRepository.findOne({ where: { id } })
  }

  update(id: number, updateTopicDto: UpdateTopicDto): Promise<UpdateResult> {
    return this.topicRepository.update(id, updateTopicDto)
  }

  remove(id: number): Promise<DeleteResult> {
    return this.topicRepository.delete(id)
  }
}
