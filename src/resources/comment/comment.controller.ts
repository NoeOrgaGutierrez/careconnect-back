import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { CommentService } from './comment.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { Comment } from './entities/comment.entity'
import { DeleteResult, UpdateResult } from 'typeorm'

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentService.create(createCommentDto)
  }

  @Get()
  findAll(): Promise<Comment[]> {
    return this.commentService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Comment | null> {
    return this.commentService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto
  ): Promise<UpdateResult> {
    return this.commentService.update(+id, updateCommentDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.commentService.remove(+id)
  }
}
