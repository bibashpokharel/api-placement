import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoordinatorCourseService } from 'src/coordinator-course/coordinator-course.service';
import { CoordinatorCourse } from 'src/coordinator-course/entity/coordinator-course.entity';
import { User } from 'src/user/entity/user.entity';
import { UserRole } from 'src/user/types/user.role';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CoordinatorProfileDto } from './dto/coordinator-profile.dto';
import { CoordinatorProfile } from './entity/coordinator-profile.entity';

@Injectable()
export class CoordinatorService {
  constructor(
    @InjectRepository(CoordinatorProfile)
    private readonly coordinatorRepository: Repository<CoordinatorProfile>,
    @InjectRepository(CoordinatorCourse)
    private readonly coordinatorCourseRepository: Repository<CoordinatorCourse>,
    private readonly userService: UserService,
    private readonly coordinatorCourseService: CoordinatorCourseService,
  ) {}

  async saveProfile(
    id: string,
    body: CoordinatorProfileDto,
  ): Promise<CoordinatorProfile> {
    try {
      const user = await this.userService.findUserById(id);
      if (!user || user.role !== UserRole.COORDINATOR)
        throw new NotFoundException('Coordinator not found');
      return await this.coordinatorRepository.save({
        ...body,
        user,
      });
    } catch (err) {
      throw err;
    }
  }

  async getProfile(id: string): Promise<CoordinatorProfile> {
    try {
      return await this.coordinatorRepository.findOne({
        where: { user: id },
      });
    } catch (err) {
      throw err;
    }
  }

  async updateProfile(
    id: string,
    body: CoordinatorProfileDto,
  ): Promise<CoordinatorProfile> {
    try {
      const user = await this.userService.findUserById(id);
      if (!user || user.role !== UserRole.COORDINATOR)
        throw new NotFoundException('Coordinator not found');
      const profile = await this.coordinatorRepository.findOne({
        where: { user: id },
      });
      return await this.coordinatorRepository.save({
        ...profile,
        ...body,
      });
    } catch (err) {
      throw err;
    }
  }

  async getAllUnassignedCoordinator(): Promise<any> {
    try {
      const coordinators = await this.userService.findAllSpecifcUser(
        UserRole.COORDINATOR,
      );
      const allCourseCoordinator = await this.coordinatorCourseRepository.find({
        relations: ['coordinator'],
      });
      const courseCoordinatorIds = allCourseCoordinator.map(
        (c) => c.coordinator.id,
      );
      const unassignedCoordinators = coordinators.map((coordinator) => {
        if (!courseCoordinatorIds.includes(coordinator.id)) {
          return coordinator;
        }
      });
      return unassignedCoordinators.filter(Boolean);
    } catch (err) {
      throw err;
    }
  }
}
