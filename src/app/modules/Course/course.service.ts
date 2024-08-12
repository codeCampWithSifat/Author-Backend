import { Review } from '../Review/review.model';
import { ICourse } from './course.interface';
import { Course } from './course.model';
import calculateDurationInWeeks from './Course.utils';

const createCourse = async (payload: ICourse) => {
  const coursedurations = calculateDurationInWeeks(
    payload.startDate,
    payload.endDate,
  );
  payload.durationInWeeks = coursedurations;
  const result = (
    await (await Course.create(payload)).populate('categoryId')
  ).populate('createdBy');
  return result;
};

const getAllFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };
  const courseSearchableFields = [
    'title',
    'instructor',
    'language',
    'provider',
    'details.level',
  ];

  let searchTerm = '';

  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  const searchQuery = Course.find({
    $or: courseSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  // Filtering
  const excludesFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

  excludesFields.forEach((el) => delete queryObj[el]);
  const filterQuery = searchQuery
    .find(queryObj)
    .populate('categoryId')
    .populate('createdBy');

  let sort = '-createdAt';

  if (query?.sort) {
    sort = query?.sort as string;
  }

  const sortQuery = filterQuery.sort(sort);

  let limit = 1;
  let page = 1;
  let skip = 0;

  if (query?.page) {
    page = query?.page as number;
    skip = (page - 0) * limit;
  }

  if (query?.limit) {
    limit = query?.limit as number;
  }

  const paginateQuery = sortQuery.skip(skip);
  const limitQuery = await paginateQuery.limit(limit);

  return limitQuery;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate('categoryId');
  return result;
};

const updateCourse = async (id: string, payload: Partial<ICourse>) => {
  const { tags, details, ...remainingData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = { ...remainingData };

  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      modifiedUpdatedData[`details.${key}`] = value;
    }
  }
  if (tags && tags.length) {
    modifiedUpdatedData.tags = tags;
  }

  const result = await Course.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteCourse = async (id: string) => {
  const result = await Course.findByIdAndDelete(id);
  return result;
};

const reviewCourse = async (courseId: string) => {
  const course = await Course.findById(courseId).lean();
  if (!course) {
    throw new Error('Course Not Found');
  }
  const reviews = await Review.find({ courseId }).lean();
  const responseData = {
    course,
    reviews,
  };
  return responseData;
};

export const CourseService = {
  createCourse,
  getAllFromDB,
  getSingleCourseFromDB,
  deleteCourse,
  updateCourse,
  reviewCourse,
};
