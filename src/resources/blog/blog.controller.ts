import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { BlogService } from './blog.service'
import { CreateBlogDto } from './dto/create-blog.dto'
import { UpdateBlogDto } from './dto/update-blog.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  @ApiOperation({ summary: 'Create blog' })
  @Post()
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto)
  }
  @ApiOperation({ summary: 'Get all blogs' })
  @Get()
  findAll() {
    return this.blogService.findAll()
  }
  @ApiOperation({ summary: 'Get blog by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id)
  }
  @ApiOperation({ summary: 'Update blog' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(+id, updateBlogDto)
  }
  @ApiOperation({ summary: 'Delete blog' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id)
  }

  @ApiOperation({ summary: 'Get blogs by association id' })
  @Get('association/:id')
  getBlogsByAssociationId(@Param('id') id: string) {
    return this.blogService.getBlogsByAssociationId(+id)
  }
}
