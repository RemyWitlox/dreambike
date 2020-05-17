import { BikeType } from './bikeType';
import { BikeDriver } from './bikeDriver';

export class Bike {
  bikeId: number;
  name: string;
  type: BikeType;
  driver: BikeDriver;
  size: number;
  created: Date;
}
