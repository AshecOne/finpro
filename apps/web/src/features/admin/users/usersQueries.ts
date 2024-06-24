import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getUsers, getUserById } from '@/features/admin/users/usersFetchers';
import { MRT_PaginationState, MRT_SortingState } from 'material-react-table';

export const useGetUsers = (
  globalFilter: string,
  pagination: MRT_PaginationState,
  sorting: MRT_SortingState,
) => {
  return useQuery({
    queryKey: [
      'users',
      globalFilter,
      pagination.pageIndex,
      pagination.pageSize,
      sorting,
    ],
    queryFn: async () => {
      let sortBy = 'name';
      let orderBy = 'asc';

      sorting.forEach((s) => {
        s.id ? (sortBy = s.id) : 'name';
        s.desc ? (orderBy = 'desc') : 'asc';
      });

      const res = await getUsers({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        filter: globalFilter ?? '',
        sortBy,
        orderBy,
      });

      return res;
    },
    placeholderData: keepPreviousData,
  });
};

export const useGetUserById = (id: number) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      return await getUserById(id);
    },
  });
};
