import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateGroupStudentDto } from './dto/create-group_student.dto';
import { UpdateGroupStudentDto } from './dto/update-group_student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { GroupStudent, GroupStudentDocument } from './models/group_student.model';
import { Model } from 'mongoose';
import { Student, StudentDocument } from '../student/models/student.model';
import { GroupDocument } from '../group/models/group.model';

@Injectable()
export class GroupStudentService {
  constructor(
    @InjectModel(GroupStudent.name) private readonly groupStudentModel:Model<GroupStudentDocument>,
    @InjectModel(Student.name) private readonly studentModel:Model<StudentDocument>,
    @InjectModel(Student.name) private readonly groupModel:Model<GroupDocument>,
    
    ) {}
  async create(createGroupStudentDto: CreateGroupStudentDto) {
    const group = await this.groupModel.findOne({id: createGroupStudentDto.group_id})
    if (!group) throw new BadRequestException("group not found");
    const student = await this.studentModel.findOne({id: createGroupStudentDto.student_id})
    if (!student) throw new BadRequestException("student not found");

    return this.groupStudentModel.create(createGroupStudentDto);
  }


  findOne(id: string) {
    return this.groupStudentModel.findById(id).populate('student_id');
  }

  update(id: string, updateGroupStudentDto: UpdateGroupStudentDto) {
    return this.groupStudentModel.findByIdAndDelete(id, updateGroupStudentDto).populate('student_id')
  }

  async remove(id: string) {
    await this.groupStudentModel.findByIdAndRemove(id)
  } 
}
