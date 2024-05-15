import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreateBlogDto } from './dto/create-blog.dto'
import { UpdateBlogDto } from './dto/update-blog.dto'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { Blog } from './entities/blog.entity'

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
}
