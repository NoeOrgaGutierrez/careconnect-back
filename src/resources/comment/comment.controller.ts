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
import { ApiOperation, ApiTags } from '@nestjs/swagger'
@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @ApiOperation({ summary: 'Create a comment' })
  @Post()
  create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentService.create(createCommentDto)
  }
  @ApiOperation({ summary: 'Get all comments' })
  @Get()
  findAll(): Promise<Comment[]> {
    return this.commentService.findAll()
  }
  @ApiOperation({ summary: 'Get a comment' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Comment | null> {
    return this.commentService.findOne(+id)
  }
  @ApiOperation({ summary: 'Update a comment' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto
  ): Promise<UpdateResult> {
    return this.commentService.update(+id, updateCommentDto)
  }
  @ApiOperation({ summary: 'Delete a comment' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.commentService.remove(+id)
  }
}
