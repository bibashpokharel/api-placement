import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentModule } from 'src/department/department.module';
import { HospitalModule } from 'src/hospital/hospital.module';
import { UserModule } from 'src/user/user.module';
import { SupervisorController } from './clinical-supervisor.controller';
import { SupervisorService } from './clinical-supervisor.service';
import { SupervisorProfile } from './entity/clinicalSupervisorProfile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SupervisorProfile]),
    UserModule,
    HospitalModule,
    DepartmentModule,
  ],
  controllers: [SupervisorController],
  providers: [SupervisorService],
})
export class SupervisorModule {}
