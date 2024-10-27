import { Box, Divider, Typography } from '@mui/material';
import TitleWithThemeToggle from '../views/TitleWithThemeToggle';
import { useSearchParams } from 'react-router-dom';
import ResetPasswordForm from '../views/ResetPasswordForm';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const email: string | null = searchParams.get('email');
  const token: string | null = searchParams.get('token');
  return (
    <>
      <TitleWithThemeToggle title="Reset Password" showWellCome={false} />
      <Divider sx={{ my: 3 }} />

      <Typography variant="body1" gutterBottom>
        You have requested to reset the password for:{' '}
        <Box component={'strong'} sx={{ color: 'primary.main' }}>
          {email}
        </Box>
      </Typography>

      <ResetPasswordForm token={token || ''} />
    </>
  );
};

export default ResetPassword;
