import React from 'react';
import { Typography } from '@mui/material';

interface TitleProps {
  text: string;
}

const TitleComponent: React.FC<TitleProps> = ({ text }) => {
  return (
    <Typography
      variant="h4"
      component="h1"
      gutterBottom
      sx={{ fontWeight: 'bold', textAlign: 'center' }}
    >
      {text}
    </Typography>
  );
};

export default TitleComponent;
