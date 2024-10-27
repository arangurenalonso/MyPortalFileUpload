import { Divider, Typography } from '@mui/material';
import TitleWithThemeToggle from '../views/TitleWithThemeToggle';
import ForgotPasswordForm from '../views/ForgotPasswordForm';

const ForgotPassword = () => {
  return (
    <>
      <TitleWithThemeToggle title="Forgot Password?" showWellCome={false} />
      <Divider sx={{ my: 3 }} />

      <Typography variant="body1" gutterBottom>
        Please enter your email address below so we can send you a link to reset
        your password.
      </Typography>

      <ForgotPasswordForm />
    </>
  );
};

export default ForgotPassword;
