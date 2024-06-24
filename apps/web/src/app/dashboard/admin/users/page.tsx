import Link from 'next/link';
import DashboardBreadcrumbs from '@/components/core/DashboardBreadcrumbs';
import UserListTable from '@/components/table/UserListTable';
import { dashboardAdminPages } from '@/utils/routes';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

export default function UserPage() {
  return (
    <>
      <DashboardBreadcrumbs route={dashboardAdminPages.user} />
      <Link href={dashboardAdminPages.user.path + '/create'} passHref>
        <Button
          variant="contained"
          color="info"
          startIcon={<AddIcon />}
          sx={{ mt: 2 }}
        >
          User
        </Button>
      </Link>
      <Box sx={{ maxWidth: '100%', mt: 2 }}>
        <UserListTable />
      </Box>
    </>
  );
}