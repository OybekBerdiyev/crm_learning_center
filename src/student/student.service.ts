import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from './models/student.model';
import { Model } from 'mongoose';

@Injectable()
export class StudentService {
  constructor(@InjectModel(Student.name) private readonly studentModel: Model<StudentDocument>) {}

  create(createStudentDto: CreateStudentDto) {
    return this.studentModel.create(createStudentDto)
  }

  findAll() {
    return this.studentModel.find()
  }

  findOne(id: string) {
    return this.studentModel.findById(id);
  }

  update(id: string, updateStudentDto: UpdateStudentDto) {
    return this.studentModel.findByIdAndUpdate(id, updateStudentDto, {new: true});
  }
  
  async remove(id: string) {
    await this.studentModel.findByIdAndRemove(id);
    return {message: "Successfully removed"}
  }
}