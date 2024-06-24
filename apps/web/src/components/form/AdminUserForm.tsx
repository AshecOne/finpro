'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, TextField, Button } from '@mui/material';
import { adminUserSchema, AdminUserSchema } from './schemas/adminUserSchema';
import { useCreateAdminUser, useUpdateAdminUser } from '@/features/admin/users/userMutations';
import { useGetUserById } from '@/features/admin/users/usersQueries';
import { errorFetcherNotification } from '@/utils/notifications';
import { useSession } from 'next-auth/react';
import { UserSession } from '@/features/types';
import LinkButton from '@/components/button/LinkButton';
import {
  adminFormContainerStyles,
  adminFormStyles,
} from '@/styles/adminFormStyles';
import { dashboardAdminPages } from '@/utils/routes';

const defaultValues: AdminUserSchema = {
  name: '',
  email: '',
  password: '',
};

type AdminUserFormProps = {
  mode: 'create' | 'update';
};

export default function AdminUserForm({ mode }: AdminUserFormProps) {
  const { id } = useParams();
  const userId = Number(id);
  const isUpdateMode = mode === 'update';

  const session = useSession();
  const user = session.data?.user as UserSession;

  const { handleSubmit, control, reset } = useForm<AdminUserSchema>({
    resolver: zodResolver(adminUserSchema),
    defaultValues,
  });

  const createAdminUserMutation = useCreateAdminUser();
  const updateAdminUserMutation = useUpdateAdminUser();

  const { data: userData, error: errorQuery, isLoading: isQueryPending, isError: isErrorQuery } = useGetUserById(userId);

  useEffect(() => {
    if (isUpdateMode && userData) {
      reset(userData.result);
    }
  }, [isUpdateMode, userData, reset]);

  if (isErrorQuery) {
    errorFetcherNotification(errorQuery);
  }

  const onSubmit = async (data: AdminUserSchema) => {
    if (isUpdateMode) {
      await updateAdminUserMutation.mutateAsync({ ...data, id: userId });
    } else {
      await createAdminUserMutation.mutateAsync(data);
    }
    reset(defaultValues);
  };

  const disabledOnPending = createAdminUserMutation.isPending || updateAdminUserMutation.isPending || isQueryPending;
  const onlySuperAdmin = disabledOnPending || user?.role !== 'SUPER_ADMIN';

  return (
    <Box component="main" sx={adminFormContainerStyles}>
      <Box
        component="form"
        autoCapitalize="off"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={adminFormStyles}
      >
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState: { error } }) => (
            <TextField
              fullWidth
              required
              size="small"
              label="Name"
              variant="outlined"
              placeholder="Name"
              disabled={onlySuperAdmin}
              {...field}
              helperText={error?.message}
              error={Boolean(error)}
              InputLabelProps={{ shrink: true, required: true }}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState: { error } }) => (
            <TextField
              fullWidth
              required
              size="small"
              label="Email"
              variant="outlined"
              placeholder="Email"
              disabled={onlySuperAdmin}
              {...field}
              helperText={error?.message}
              error={Boolean(error)}
              InputLabelProps={{ shrink: true, required: true }}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState: { error } }) => (
            <TextField
              fullWidth
              required
              size="small"
              type="password"
              label="Password"
              variant="outlined"
              placeholder="Password"
              disabled={onlySuperAdmin}
              {...field}
              helperText={error?.message}
              error={Boolean(error)}
              InputLabelProps={{ shrink: true, required: true }}
            />
          )}
        />
        <Box sx={{ display: 'flex', gap: 1, mt: 1, justifyContent: 'end' }}>
          {user?.role === 'SUPER_ADMIN' && (
            <Button
              type="submit"
              variant="contained"
              color="info"
              disabled={disabledOnPending}
            >
              Submit
            </Button>
          )}
          <LinkButton
            href={dashboardAdminPages.user.path}
            variant="back"
            disabled={disabledOnPending}
          >
            Back
          </LinkButton>
        </Box>
      </Box>
    </Box>
  );
}
