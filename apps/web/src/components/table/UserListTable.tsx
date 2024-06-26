'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_PaginationState,
  type MRT_SortingState,
} from 'material-react-table';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserResponse } from '@/features/admin/users/types';
import { useGetUsers } from '@/features/admin/users/usersQueries';
import { useDeleteAdminUser } from '@/features/admin/users/userMutations';
import { dashboardAdminPages } from '@/utils/routes';
import ConfirmationDialog, { SelectedRow } from '@/components/dialog/ConfirmationDialog';
import LinkButton from '@/components/button/LinkButton';
import { UserSession } from '@/features/types';

export default function UserListTable() {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<SelectedRow | null>(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const router = useRouter();
  const session = useSession();
  const user = session.data?.user as UserSession;

  const { mutateAsync, isPending: isMutatePending } = useDeleteAdminUser();
  const { data, isError, isRefetching, isLoading, refetch } = useGetUsers(
    globalFilter,
    pagination,
    sorting,
  );

  const handleClickOpen = (row: UserResponse) => {
    setOpen(true);
    setSelectedRow({ id: row.id, name: row.username });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = useMemo<MRT_ColumnDef<UserResponse>[]>(
    () => [
      {
        accessorKey: 'username',
        header: 'Name',
        enableColumnActions: false,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        enableColumnActions: false,
      },
      {
        accessorKey: 'role',
        header: 'Role',
        enableColumnActions: false,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: data?.result ?? [],
    initialState: { showColumnFilters: true },
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    muiToolbarAlertBannerProps: isError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    renderTopToolbarCustomActions: () => (
      <Tooltip arrow title="Refresh Data">
        <IconButton onClick={() => refetch()}>
          <RefreshIcon />
        </IconButton>
      </Tooltip>
    ),
    rowCount: data?.pagination?.total ?? 0,
    state: {
      globalFilter,
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      sorting,
    },
    enableDensityToggle: false,
    enableColumnFilters: false,
    enableFullScreenToggle: false,
    enableStickyHeader: true,
    enableEditing: true,
    layoutMode: 'grid',
    enableRowActions: true,
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: '',
        size: user?.role === 'SUPER_ADMIN' ? 120 : 60,
        grow: false,
      },
    },
    renderRowActions: ({ row }) => (
      <Box
        sx={{
          display: 'flex',
          gap: '.5rem',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Tooltip title={user?.role === 'SUPER_ADMIN' ? 'Edit' : 'View'}>
          <IconButton
            size="small"
            onClick={() => {
              router.push(
                dashboardAdminPages.user.path +
                  `/update/${row.original.id}`,
              );
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        {user?.role === 'SUPER_ADMIN' && (
          <Tooltip title="Delete">
            <IconButton
              size="small"
              color="error"
              onClick={() => handleClickOpen(row.original)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    ),
  });

  return (
    <>
      <Box sx={{ maxWidth: '100%', mt: 2 }}>
        <MaterialReactTable table={table} />
      </Box>
      <ConfirmationDialog
        open={open}
        onClose={handleClose}
        selectedRow={selectedRow}
        mutateAsync={mutateAsync}
        isMutatePending={isMutatePending}
      />
    </>
  );
}
