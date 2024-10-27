import { useForm, SubmitHandler } from 'react-hook-form';
import useAuthStore from '../../../hooks/useAuthStore';
import { Box, TextField, Button, Alert } from '@mui/material';

type ForgotPasswordFormInputs = {
  email: string;
};
const ForgotPasswordForm = () => {
  const { forgotPasswordProcess, errorMessage } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInputs>({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormInputs> = async (data) => {
    await forgotPasswordProcess(data.email);
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          variant="outlined"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Invalid email address',
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
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
            {errorMessage}
          </Alert>
        )}
      </Box>
    </>
  );
};

export default ForgotPasswordForm;
