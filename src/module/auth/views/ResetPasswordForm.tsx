import { useForm, SubmitHandler } from 'react-hook-form';
import useAuthStore from '../../../hooks/useAuthStore';
import { Box, TextField, Button, Alert } from '@mui/material';

type RegisterFormInputs = {
  password: string;
  confirmPassword: string;
};
type ResetPasswordFormProps = {
  token: string;
};
const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const { resetPasswordProcess, errorMessage } = useAuthStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    if (data.password !== data.confirmPassword) {
      return;
    }
    resetPasswordProcess(token, data.password, data.confirmPassword);
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long',
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) =>
              value === watch('password') || 'Passwords do not match',
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Submit
        </Button>

        {errorMessage && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage.map((error, index) => (
              <Box key={index}>- {error}</Box>
            ))}
          </Alert>
        )}
      </Box>
    </>
  );
};

export default ResetPasswordForm;
