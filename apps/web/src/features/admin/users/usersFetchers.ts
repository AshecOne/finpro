import {
  QueryPagination,
  ResponseDataPagination,
  ResponseWithData,
  ResponseWithoutData,
} from '@/features/types';
import { createAxiosInstance } from '@/utils/axiosInstance';
import { UserResponse } from './types';
import { AdminUserSchema } from '@/components/form/schemas/adminUserSchema';

export const getUsers = async (params: QueryPagination) => {
  const instance = await createAxiosInstance();
  const res = await instance.get<ResponseDataPagination<UserResponse[]>>(
    '/admin/users',
    { params },
  );

  return res.data;
};

export const createUser = async (data: AdminUserSchema) => {
  const instance = await createAxiosInstance();
  const res = await instance.post<ResponseWithoutData>('/admin/users', data);

  return res.data;
};

export const getUserById = async (id: number) => {
  const instance = await createAxiosInstance();
  const res = await instance.get<ResponseWithData<UserResponse>>(
    `/admin/users/${id}`,
  );

  return res.data;
};

export const updateUser = async (data: AdminUserSchema & { id: number }) => {
  const instance = await createAxiosInstance();
  const res = await instance.put<ResponseWithoutData>(`/admin/users/${data.id}`, data);

  return res.data;
};

export const deleteUser = async (id: number) => {
  const instance = await createAxiosInstance();
  const res = await instance.delete<ResponseWithoutData>(`/admin/users/${id}`);

  return res.data;
};
