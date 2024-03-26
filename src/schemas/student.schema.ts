import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Student {
  @Prop({
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    required: true,
    trim: true,
  })
  lastname: string;

  @Prop({
    required: true,
    trim: true,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
    trim: true,
    unique: true,
  })
  password: string;

  @Prop({
    required: true,
    trim: true,
  })
  status: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
