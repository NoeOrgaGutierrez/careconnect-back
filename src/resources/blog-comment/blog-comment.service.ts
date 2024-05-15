import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreateBlogCommentDto } from './dto/create-blog-comment.dto'
import { UpdateBlogCommentDto } from './dto/update-blog-comment.dto'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { BlogComment } from './entities/blog-comment.entity'

@Injectable()
export class BlogCommentService {
  constructor(
    @Inject('BLOG_COMMENT_REPOSITORY')
    private readonly blogCommentRepository: Repository<BlogComment>
  ) {}
  create(createBlogCommentDto: CreateBlogCommentDto): Promise<BlogComment> {
    const newBlogComment: BlogComment =
      this.blogCommentRepository.create(createBlogCommentDto)
    return this.blogCommentRepository.save(newBlogComment)
  }

  async findAll(): Promise<BlogComment[]> {
    const blogComments: BlogComment[] = await this.blogCommentRepository.find({
      relations: {
        blog: true,
        member: true,
        parentComment: true
      },
      select: {
        id: true,
        content: true,
        created: true,
        updated: true,
        blog: {
          id: true
        },
        member: {
          id: true
        },
        parentComment: {
          id: true
        }
      }
    })
    if (blogComments.length > 0) {
      return blogComments
    }
    throw new NotFoundException('Comments not found')
  }

  async findOne(id: number): Promise<BlogComment> {
    const blogComment = await this.blogCommentRepository.findOne({
      where: { id },
      relations: {
        blog: true,
        member: true,
        parentComment: true
      },
      select: {
        id: true,
        content: true,
        created: true,
        updated: true,
        blog: {
          id: true
        },
        member: {
          id: true
        },
        parentComment: {
          id: true
        }
      }
    })
    if (blogComment) {
      return blogComment
    }
    throw new NotFoundException('Comment not found')
  }

  update(
    id: number,
    updateBlogCommentDto: UpdateBlogCommentDto
  ): Promise<UpdateResult> {
    return this.blogCommentRepository.update(id, updateBlogCommentDto)
  }

  remove(id: number): Promise<DeleteResult> {
    return this.blogCommentRepository.delete(id)
  }
}
