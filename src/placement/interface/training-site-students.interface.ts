import { TrainingDaysEnum } from 'src/training-site-time-slot/types/training-site-days.enum';

export interface TrainingSiteStudents {
  studentId: string;
  name: string;
  email: string;
  startTime: string;
  endTime: string;
  day: TrainingDaysEnum;
}
