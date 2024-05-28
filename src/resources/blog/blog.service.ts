import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreateBlogDto } from './dto/create-blog.dto'
import { UpdateBlogDto } from './dto/update-blog.dto'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { Blog } from './entities/blog.entity'
import { BlogComment } from '../blog-comment/entities/blog-comment.entity'

@Injectable()
export class BlogService {
  constructor(
    @Inject('BLOG_REPOSITORY') private blogRepository: Repository<Blog>
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
  async getBlogCommentsByBlogId(id: number): Promise<BlogComment[]> {
    const blog = await this.blogRepository.findOne({
      where: { id },
      relations: [
        'blogComments',
        'blogComments.member',
        'blogComments.member.user',
        'blogComments.parentComment'
      ]
    })

    if (!blog) {
      throw new NotFoundException('Blog not found')
    }

    const comments = blog.blogComments

    // Convert the flat array to a nested structure
    const nestComments = (comments: BlogComment[]): BlogComment[] => {
      const commentMap = new Map<number, BlogComment>()

      // Initialize the map with all comments
      comments.forEach((comment) => {
        comment.blogComments = []
        commentMap.set(comment.id, comment)
      })

      const nestedComments: BlogComment[] = []

      // Process the comments to form the nested structure
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
