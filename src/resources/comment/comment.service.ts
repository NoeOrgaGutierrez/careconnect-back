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
    return this.commentRepository.find()
  }

  findOne(id: number): Promise<Comment | null> {
    return this.commentRepository.findOne({ where: { id } })
  }

  update(
    id: number,
    updateCommentDto: UpdateCommentDto
  ): Promise<UpdateResult> {
    return this.commentRepository.update(id, updateCommentDto)
  }

  remove(id: number): Promise<DeleteResult> {
    return this.commentRepository.delete(id)
  }
}
