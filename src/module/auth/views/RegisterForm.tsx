import { useForm, SubmitHandler } from 'react-hook-form';
import useAuthStore from '../../../hooks/useAuthStore';
// import useGeolocation from '../../../hooks/useGeolocation';
import { Box, TextField, Button, Alert } from '@mui/material';

type RegisterFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm = () => {
  const { registerProcess, errorMessage } = useAuthStore();
  // const { timezone } = useGeolocation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    // const timeZoneIntl = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (data.password !== data.confirmPassword) {
      // Handle password mismatch error
      return;
    }
    registerProcess({
      firstName: data.firstName,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      lastName: data.lastName,
      // timeZone: timezone || timeZoneIntl,
    });
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          variant="outlined"
          {...register('firstName', {
            required: 'Name is required',
          })}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
        <TextField
          label="LastName"
          fullWidth
          margin="normal"
          variant="outlined"
          {...register('lastName', {
            required: 'LastName is required',
          })}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />

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
          Sign Up
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

export default RegisterForm;
