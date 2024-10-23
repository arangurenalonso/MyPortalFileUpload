import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

interface LoadingOverlayProps {
  isLoading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000 }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingOverlay;
