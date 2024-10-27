import { Box } from '@mui/material';
import { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          maxWidth: 400,
          mx: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 0,
        }}
      >
        <Box sx={{ width: '100%' }}>{children}</Box>
      </Box>
    </>
  );
};

export default AuthLayout;
