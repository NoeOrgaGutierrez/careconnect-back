import { Inject, Injectable } from '@nestjs/common'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { Comment } from './entities/comment.entity'

@Injectable()
export class CommentService {
  constructor(
    @Inject('COMMENT_REPOSITORY') private commentRepository: Repository<Comment>
  ) {}
  create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const newComment = this.commentRepository.create(createCommentDto)
    return this.commentRepository.save(newComment)
  }

  findAll(): Promise<Comment[]> {
    return this.commentRepository.find({
      relations: {
        user: true,
        publication: true
      },
      select: {
        user: {
          id: true
        },
        publication: {
          id: true
        }
      }
    })
  }

  findOne(id: number): Promise<Comment | null> {
    return this.commentRepository.findOne({
      where: { id },
      relations: {
        user: true,
        publication: true
      },
      select: {
        user: {
          id: true
        },
        publication: {
          id: true
        }
      }
    })
  }

  update(
    id: number,
    updateCommentDto: UpdateCommentDto
  ): Promise<UpdateResult> {
    updateCommentDto.updated_at = new Date(Date.now())
    return this.commentRepository.update(id, updateCommentDto)
  }

  remove(id: number): Promise<DeleteResult> {
    return this.commentRepository.delete(id)
  }
}
