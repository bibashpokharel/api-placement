import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { StudentProfile } from './entity/student-profile.entity';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudentProfile]), UserModule],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
