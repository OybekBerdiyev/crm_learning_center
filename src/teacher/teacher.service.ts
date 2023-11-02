import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Teacher, TeacherDocument } from './models/teacher.model';
import { Model } from 'mongoose';
import { Subject, SubjectDocument } from '../subject/models/subject.model';

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Teacher.name) private readonly teacherModel: Model<TeacherDocument>,
    @InjectModel(Subject.name) private readonly subjectModel: Model<SubjectDocument>,
    ) {}
  async create(createTeacherDto: CreateTeacherDto) {
    const subject = await this.subjectModel.findOne({_id: createTeacherDto.subject_id});
    if(!subject) throw new BadRequestException("Subject not found");
    return this.teacherModel.create(createTeacherDto)
  }

  findAll() {
    return this.teacherModel.find().populate('subject_id')
  }

  findOne(id: string) {
    return this.teacherModel.findById(id).populate('subject_id')
  }

  update(id: string, updateTeacherDto: UpdateTeacherDto) {
    return this.teacherModel.findByIdAndUpdate(id, updateTeacherDto, {new: true}).populate('subject_id')
  }

  remove(id: string) {
    return this.teacherModel.findByIdAndRemove(id)
  }
}
