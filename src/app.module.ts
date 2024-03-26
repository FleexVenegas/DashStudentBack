import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/studentsdb'),
    StudentModule,
  ],
})
export class AppModule {}
