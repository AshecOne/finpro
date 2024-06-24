import DashboardBreadcrumbs from '@/components/core/DashboardBreadcrumbs';
import AdminUserForm from '@/components/form/AdminUserForm';
import { dashboardAdminPages } from '@/utils/routes';
import Box from '@mui/material/Box';

export default function UserUpdatePage() {
  return (
    <>
      <DashboardBreadcrumbs
        route={dashboardAdminPages.user}
        action="Update"
      />
      <Box sx={{ maxWidth: '100%', mt: 2 }}>
        <AdminUserForm mode="update" />
      </Box>
    </>
  );
}
