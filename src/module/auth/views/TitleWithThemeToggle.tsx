import { Box, Typography } from '@mui/material';
import ThemeSwitcher from '../../../common/components/ThemeSwitcher';

type TitleWithThemeToggleProp = {
  title: string;
  showWellCome: boolean;
};

const TitleWithThemeToggle = ({
  title,
  showWellCome,
}: TitleWithThemeToggleProp) => {
  return (
    <>
      {showWellCome && (
        <Typography
          variant="h4"
          sx={{ textAlign: 'center' }}
          component="h4"
          mb={2}
        >
          Welcome
        </Typography>
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" component="h5" gutterBottom>
          {title}
        </Typography>
        <ThemeSwitcher />
      </Box>
    </>
  );
};

export default TitleWithThemeToggle;
