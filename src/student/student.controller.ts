import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from 'src/dto/create-student.dto';
import { UpdateStudentDto } from 'src/dto/update-student.dto';

@Controller('api/v1/student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  // Get all the vaues of the database
  @Get('/')
  async getStudents() {
    const dataStudents = await this.studentService.findAll();
    return dataStudents;
  }

  @Get('/:id')
  async getStudentById(@Param('id') id: string) {
    const findStudent = await this.studentService.findOne(id);

    if (!findStudent) throw new NotFoundException('Student not found');
    return findStudent;
  }

  @Post('/')
  async createstudent(@Body() req: CreateStudentDto) {
    try {
      const createstudent = await this.studentService.create(req);
      return {
        message: 'Student created successfully',
        status: 'ok',
        data: [createstudent],
      };
    } catch (error) {
      if (error.code === 11000) {
        var typeKey = 'email';
        if (!error.keyValue.hasOwnProperty('email')) {
          typeKey = 'password';
        }
        throw new ConflictException(`Token already exists --> ${typeKey}`);
      }
      throw error;
    }
  }

  @Delete('/:id')
  //   @HttpCode(204)
  async deleteStudent(@Param('id') id: string) {
    const deletedStudent = await this.studentService.delete(id);

    if (!deletedStudent) throw new NotFoundException('Student not found');

    return { message: 'Deleted students', status: 'ok' };
  }

  @Put('/:id')
  async updateStudent(@Param('id') id: string, @Body() req: UpdateStudentDto) {
    const updateStudent = await this.studentService.update(id, req);

    if (!updateStudent) throw new NotFoundException('Student not found');
    return { message: 'Updated student', status: 'ok', data: [updateStudent] };
  }
}
