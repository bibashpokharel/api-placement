import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollegeDepartmentModule } from 'src/college-department/college-department.module';
import { UserModule } from 'src/user/user.module';
import { CoordinatorController } from './coordinator.controller';
import { CoordinatorService } from './coordinator.service';
import { CoordinatorProfile } from './entity/coordinator-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CoordinatorProfile]), UserModule],
  controllers: [CoordinatorController],
  providers: [CoordinatorService],
})
export class CoordinatorModule {}