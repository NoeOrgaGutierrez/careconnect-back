import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreateBlogDto } from './dto/create-blog.dto'
import { UpdateBlogDto } from './dto/update-blog.dto'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { Blog } from './entities/blog.entity'
import { BlogComment } from '../blog-comment/entities/blog-comment.entity'
import { Valoration } from '../valoration/entities/valoration.entity'

@Injectable()
export class BlogService {
  constructor(
    @Inject('BLOG_REPOSITORY') private blogRepository: Repository<Blog>,
    @Inject('VALORATION_REPOSITORY')
    private valorationRepository: Repository<Valoration>
  ) {}
  create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const newBlog = this.blogRepository.create(createBlogDto)
    return this.blogRepository.save(newBlog)
  }

  async findAll(): Promise<Blog[]> {
    const blogs = await this.blogRepository.find()
    if (blogs.length > 0) {
      return blogs
    }
    throw new NotFoundException('Blogs not found')
  }

  async findOne(id: number): Promise<Blog> {
    const blog = await this.blogRepository.findOne({ where: { id } })
    if (blog) {
      return blog
    }
    throw new NotFoundException('Blog not found')
  }

  update(id: number, updateBlogDto: UpdateBlogDto): Promise<UpdateResult> {
    return this.blogRepository.update(id, updateBlogDto)
  }

  remove(id: number): Promise<DeleteResult> {
    return this.blogRepository.delete(id)
  }
  getBlogsByAssociationId(id: number): Promise<Blog[]> {
    return this.blogRepository.find({
      where: { association: { id: id } },
      relations: {
        blogComments: true
      }
    })
  }
  async getBlogCommentsByBlogId(
    id: number,
    memberId: number
  ): Promise<BlogComment[]> {
    const blog = await this.blogRepository
      .createQueryBuilder('blog')
      .leftJoinAndSelect('blog.blogComments', 'blogComments')
      .leftJoinAndSelect('blogComments.member', 'member')
      .leftJoinAndSelect('member.user', 'user')
      .leftJoinAndSelect('blogComments.parentComment', 'parentComment')
      .leftJoinAndSelect(
        'blogComments.valoration',
        'valoration',
        'valoration.userAssociation = :memberId'
      )
      .where('blog.id = :id', { id })
      .setParameter('memberId', memberId)
      .getOne()

    if (!blog) {
      throw new NotFoundException('Blog not found')
    }

    const comments = blog.blogComments

    const nestComments = (comments: BlogComment[]): BlogComment[] => {
      const commentMap = new Map<number, BlogComment>()

      comments.forEach((comment) => {
        comment.blogComments = []
        commentMap.set(comment.id, comment)
      })

      const nestedComments: BlogComment[] = []

      comments.forEach((comment) => {
        if (comment.parentComment) {
          const parent = commentMap.get(comment.parentComment.id)
          if (parent) {
            parent.blogComments.push(comment)
          }
        } else {
          nestedComments.push(comment)
        }
      })

      return nestedComments
    }

    return nestComments(comments)
  }
}
