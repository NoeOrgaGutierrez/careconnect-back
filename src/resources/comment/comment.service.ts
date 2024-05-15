import { Inject, Injectable, NotFoundException } from '@nestjs/common'
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

  async findAll(): Promise<Comment[]> {
    const comments: Comment[] = await this.commentRepository.find({
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
    if (comments.length > 0) {
      return comments
    }
    throw new NotFoundException('Comments not found')
  }

  async findOne(id: number): Promise<Comment> {
    const comment: Comment | null = await this.commentRepository.findOne({
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
    if (comment) {
      return comment
    }
    throw new NotFoundException('Comment not found')
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
