import { ICategory } from './category.interface';
import { Category } from './category.model';

const createCategory = async (payload: ICategory) => {
  const result = (await Category.create(payload)).populate('createdBy');
  return result;
};

const getAllCategory = async () => {
  const result = await Category.find().populate('createdBy');
  return result;
};

const getSingleCategory = async (id: string) => {
  const result = await Category.findById(id);
  return result;
};

const deleteSingleCategory = async (id: string) => {
  const result = await Category.findByIdAndDelete(id);
  return result;
};

const updateSingleCategory = async (
  id: string,
  payload: Partial<ICategory>,
) => {
  const result = await Category.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const CategoryService = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  deleteSingleCategory,
  updateSingleCategory,
};
