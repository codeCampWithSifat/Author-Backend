import { Types } from 'mongoose';

export type ITages = {
  name: string;
  isDeleted: boolean;
};

export type IDetails = {
  level: string;
  description: string;
};

export type ICourse = {
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  price: number;
  tags: ITages[];
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  durationInWeeks?: number;
  details: IDetails;
};
