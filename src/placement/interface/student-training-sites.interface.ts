import { TrainingDaysEnum } from 'src/training-site-time-slot/types/training-site-days.enum';

export interface StudentTrainingSites {
  name: string;
  address: string;
  authority: any;
  hospital: any;
  department: any;
  startTime: string;
  endTime: string;
  day: TrainingDaysEnum;
}
