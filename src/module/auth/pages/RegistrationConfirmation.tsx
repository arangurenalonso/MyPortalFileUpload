import { Typography, Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TitleWithThemeToggle from '../views/TitleWithThemeToggle';

const RegistrationConfirmation = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('auth/login', { replace: true });
  };

  return (
    <>
      <TitleWithThemeToggle
        title="Registration Successful!"
        showWellCome={false}
      />
      <Divider sx={{ my: 3 }} />

      <Typography variant="body1" gutterBottom>
        Please check your email to confirm your account!!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Once confirmed, you can log in to your account!!
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

export default RegistrationConfirmation;
