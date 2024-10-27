import { useEffect } from 'react';
import { Typography, Button, Alert, Divider } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TitleWithThemeToggle from '../views/TitleWithThemeToggle';
import useAuthStore from '../../../hooks/useAuthStore';

const EmailConfirmation = () => {
  const { confirmEmail, errorMessage } = useAuthStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token: string | null = searchParams.get('token'); // Obtener el token de los query params

  useEffect(() => {
    if (!token) {
      return;
    }
    confirmEmail(token);
  }, [token]);

  const handleLoginRedirect = () => {
    navigate('auth/login', { replace: true });
  };

  return (
    <>
      <TitleWithThemeToggle title={'Email Confirmed!'} showWellCome={false} />

      <Divider sx={{ my: 3 }} />

      <Typography variant="body1" sx={{ mb: 4 }}>
        Your email has been successfully verified. You can now log in to your
        account.
      </Typography>

      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleLoginRedirect}
      >
        Go to Login
      </Button>
      {errorMessage && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Alert>
      )}
    </>
  );
};

export default EmailConfirmation;
