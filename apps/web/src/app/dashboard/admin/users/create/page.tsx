import DashboardBreadcrumbs from '@/components/core/DashboardBreadcrumbs';
import AdminUserForm from '@/components/form/AdminUserForm';
import { dashboardAdminPages } from '@/utils/routes';
import Box from '@mui/material/Box';

export default function UserCreatePage() {
  return (
    <>
      <DashboardBreadcrumbs
        route={dashboardAdminPages.user}
        action="Create"
      />
      <Box sx={{ maxWidth: '100%', mt: 2 }}>
        <AdminUserForm mode="create" />
      </Box>
    </>
  );
}
