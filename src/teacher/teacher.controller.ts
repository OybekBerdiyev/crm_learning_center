import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Teacher } from './models/teacher.model';
import { IsAdmin } from '../guards/isAdmin.guard';

@ApiTags("Teachers")
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @ApiOperation({summary: "Create new Teacher"})
  @ApiResponse({status: 201, type: Teacher})
  @UseGuards(IsAdmin)
  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @ApiOperation({summary: "Get all Teacher"})
  @ApiResponse({status: 200, type: [Teacher]})
  @UseGuards(IsAdmin)
  @Get()
  findAll() {
    return this.teacherService.findAll();
  }

  @ApiOperation({summary: "Get one Teacher"})
  @ApiResponse({status: 200, type: Teacher})
  @UseGuards(IsAdmin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherService.findOne(id);
  }

  @ApiOperation({summary: "Update Teacher"})
  @ApiResponse({status: 200, type: Teacher})
  @UseGuards(IsAdmin)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teacherService.update(id, updateTeacherDto);
  }

  @ApiOperation({summary: "Delete Teacher"})
  @ApiResponse({status: 200, type: "Successfully deleted"})
  @UseGuards(IsAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherService.remove(id);
  }
}
