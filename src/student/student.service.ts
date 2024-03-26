import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from '../schemas/student.schema';
import { CreateStudentDto } from '../dto/create-student.dto';
import { UpdateStudentDto } from '../dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
  ) {}

  async findAll() {
    return this.studentModel.find();
  }

  async create(createStudent: CreateStudentDto) {
      const newStudent = new this.studentModel(createStudent);
      return newStudent.save();
  }

  async findOne(id: string) {
    return this.studentModel.findById(id);
  }

  async delete(id: string) {
    return this.studentModel.findByIdAndDelete(id);
  }

  async update(id: string, student: UpdateStudentDto) {
    return this.studentModel.findByIdAndUpdate(id, student, { new: true });
  }
}
