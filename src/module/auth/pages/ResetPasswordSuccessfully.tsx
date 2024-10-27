import { Button, Divider, Typography } from '@mui/material';
import TitleWithThemeToggle from '../views/TitleWithThemeToggle';
import { useNavigate } from 'react-router-dom';

const ResetPasswordSuccessfully = () => {
  const navigate = useNavigate();
  const handleLoginRedirect = () => {
    navigate('auth/login', { replace: true });
  };

  return (
    <>
      <TitleWithThemeToggle title="Reset Password!" showWellCome={false} />
      <Divider sx={{ my: 3 }} />

      <Typography variant="body1" gutterBottom>
        Your password has been reset successfully!!
      </Typography>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleLoginRedirect}
      >
        Go to Login
      </Button>
    </>
  );
};

export default ResetPasswordSuccessfully;
