import { Inject, Injectable, NotFoundException } from '@nestjs/common'
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

  async findAll(): Promise<Topic[]> {
    const topics: Topic[] = await this.topicRepository.find({
      relations: {
        user: true
      },
      select: {
        user: {
          id: true
        },
        id: true,
        name: true,
        description: true
      }
    })
    if (topics.length > 0) {
      return topics
    }
    throw new NotFoundException('Topics not found')
  }

  async findOne(id: number): Promise<Topic> {
    const topic: Topic | null = await this.topicRepository.findOne({
      where: { id },
      relations: {
        user: true
      },
      select: {
        user: {
          id: true
        },
        id: true,
        name: true,
        description: true
      }
    })
    if (topic) {
      return topic
    }
    throw new NotFoundException('Topic not found')
  }
  async filter(topicName: string, commentCount: number): Promise<Topic[]> {
    const query = this.topicRepository.createQueryBuilder('topic')
    if (topicName) {
      query.orWhere('UPPER(topic.name) like UPPER(:topicName)', {
        topicName: '%' + topicName + '%'
      })
      query.leftJoin('topic.publications', 'publication')
      query.orWhere('UPPER(publication.name) like UPPER(:postName)', {
        postName: '%' + topicName + '%'
      })
    }
    if (commentCount !== 0) {
      query.leftJoin('publication.comments', 'comment')
      query.groupBy('topic.id')
      query.having('COUNT(comment.id) >= :commentCount', {
        commentCount: commentCount
      })
    }
    const result = await query.getMany()
    if (result.length > 0) {
      return result
    }
    throw new NotFoundException('Topics not found')
  }

  update(id: number, updateTopicDto: UpdateTopicDto): Promise<UpdateResult> {
    return this.topicRepository.update(id, updateTopicDto)
  }

  remove(id: number): Promise<DeleteResult> {
    return this.topicRepository.delete(id)
  }
}
