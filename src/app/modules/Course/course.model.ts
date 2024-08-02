import { Schema, model } from 'mongoose';
import { ICourse, IDetails, ITages } from './course.interface';

const tagsSchema = new Schema<ITages>(
  {
    name: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);

const detailsSchema = new Schema<IDetails>(
  {
    level: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    instructor: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    tags: [tagsSchema],
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    details: {
      type: detailsSchema,
      requied: true,
    },
    durationInWeeks: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const Course = model<ICourse>('Course', courseSchema);
