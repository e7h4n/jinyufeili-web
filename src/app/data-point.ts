import { DataPointType } from './data-point-type.enum';
import { StatisticsType } from './statistics-type.enum';

export class DataPoint {
  id: number;
  value: number;
  timestamp: number;
  type: DataPointType;
  statisticsType: StatisticsType;
}
