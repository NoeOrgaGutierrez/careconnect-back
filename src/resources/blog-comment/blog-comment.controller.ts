import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { BlogCommentService } from './blog-comment.service'
import { CreateBlogCommentDto } from './dto/create-blog-comment.dto'
import { UpdateBlogCommentDto } from './dto/update-blog-comment.dto'
import { BlogComment } from './entities/blog-comment.entity'
import { DeleteResult, UpdateResult } from 'typeorm'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
@ApiTags('Blog-Comment')
@Controller('blog-comment')
export class BlogCommentController {
  constructor(private readonly blogCommentService: BlogCommentService) {}
  @ApiOperation({ summary: 'Create blog comment' })
  @Post()
  create(
    @Body() createBlogCommentDto: CreateBlogCommentDto
  ): Promise<BlogComment> {
    return this.blogCommentService.create(createBlogCommentDto)
  }
  @ApiOperation({ summary: 'Get all blog comments' })
  @Get()
  findAll(): Promise<BlogComment[]> {
    return this.blogCommentService.findAll()
  }
  @ApiOperation({ summary: 'Get blog comment by id' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<BlogComment> {
    return this.blogCommentService.findOne(+id)
  }
  @ApiOperation({ summary: 'Update blog comment' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBlogCommentDto: UpdateBlogCommentDto
  ): Promise<UpdateResult> {
    return this.blogCommentService.update(+id, updateBlogCommentDto)
  }
  @ApiOperation({ summary: 'Delete blog comment' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.blogCommentService.remove(+id)
  }
}
