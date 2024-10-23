import useThemeStore from '../../../../hooks/useThemeStore';
import { themeEnum } from '../../../../store/theme/theme.initial-state';
import { Box } from '@mui/material';
type LogoMentorHubType = {
  onClick: () => void;
};
const LogoMentorHub = ({ onClick }: LogoMentorHubType) => {
  const { mode } = useThemeStore();
  return (
    <Box
      onClick={onClick}
      component="img"
      src={
        mode == themeEnum.LIGHT
          ? '/public/logo-dark.svg'
          : '/public/logo-light.svg'
      }
      alt="logo"
      sx={{
        height: '60px',
      }}
    />
  );
};

export default LogoMentorHub;
