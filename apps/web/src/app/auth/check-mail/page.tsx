import Link from 'next/link';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { formWrapperStyles } from '@/styles/authFormStyles';
import { authPages } from '@/utils/routes';

export default function CheckMailPage() {
  return (
    <Box component="main" sx={formWrapperStyles}>
      <Typography component="h1" variant="h5" sx={{ fontWeight: 500 }}>
        Hi, Check Your Mail
      </Typography>
      <Box>
        <Typography component="p" variant="body2" sx={{ mb: 1 }}>
          We have sent a password recover instructions to your email.
        </Typography>
        <Link href={authPages.login.path} passHref>
          <Button fullWidth size="large" variant="contained">
            Login
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
