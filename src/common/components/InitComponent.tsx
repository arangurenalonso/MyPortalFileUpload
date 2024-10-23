import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

// Componente de inicio que se muestra mientras se cargan los recursos
const InitComponent = () => {
  const theme = useTheme();
  const [loadingText, setLoadingText] = useState('Loading');

  useEffect(() => {
    // Animación del texto "Loading..."
    const intervalId = setInterval(() => {
      setLoadingText((prev) => (prev.length < 10 ? prev + '.' : 'Loading'));
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        flexDirection: 'column',
        gap: 2,
        transition: 'all 0.3s ease',
      }}
    >
      <CircularProgress
        size={80}
        thickness={4}
        sx={{
          color: theme.palette.primary.main,
          animation: 'spin 1.5s linear infinite',
          '@keyframes spin': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
          },
        }}
      />
      <Typography variant="h5">{loadingText}</Typography>
    </Box>
  );
};

export default InitComponent;
