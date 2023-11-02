import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupStudentService } from './group_student.service';
import { CreateGroupStudentDto } from './dto/create-group_student.dto';
import { UpdateGroupStudentDto } from './dto/update-group_student.dto';

@Controller('group/student')
export class GroupStudentController {
  constructor(private readonly groupStudentService: GroupStudentService) {}

  @Post()
  create(@Body() createGroupStudentDto: CreateGroupStudentDto) {
    return this.groupStudentService.create(createGroupStudentDto);
  }



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupStudentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupStudentDto: UpdateGroupStudentDto) {
    return this.groupStudentService.update(id, updateGroupStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupStudentService.remove(id);
  }
}
