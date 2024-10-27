import { Alert, Box, Button, Divider, Typography } from '@mui/material';
import TitleWithThemeToggle from '../views/TitleWithThemeToggle';
import { useSearchParams } from 'react-router-dom';
import useAuthStore from '../../../hooks/useAuthStore';

const PasswordResetLinkSent = () => {
  const [searchParams] = useSearchParams();
  const email: string | null = searchParams.get('email');
  const { forgotPasswordProcess, errorMessage } = useAuthStore();

  const onResentEmail = async () => {
    await forgotPasswordProcess(email || '');
  };
  return (
    <>
      <TitleWithThemeToggle
        title="Password reset link sent!"
        showWellCome={false}
      />
      <Divider sx={{ my: 3 }} />

      <Typography variant="body1" gutterBottom>
        We have just sent a password reset link to{' '}
        <Box component={'strong'} sx={{ color: 'primary.main' }}>
          {email}
        </Box>
        .
        <br />
        Please click on the link in the email to reset your password.
      </Typography>

      <Typography variant="body1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Didn't receive the email?
      </Typography>
      <ul>
        <li>
          <Typography variant="body1" gutterBottom>
            Check your spam folder
          </Typography>
        </li>
        <li>
          <Typography variant="body1" gutterBottom>
            Make sure the email address we have is spelled correctly
          </Typography>
        </li>
        <li>
          <Button size="small" onClick={onResentEmail}>
            Resent email
          </Button>
        </li>
      </ul>

      {errorMessage && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Alert>
      )}
    </>
  );
};

export default PasswordResetLinkSent;
