import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useAuthStore from '../hooks/useAuthStore';
import { authStatusEnum } from '../store/auth/auth.initial-state';
import InitComponent from '../common/components/InitComponent';
import { Box } from '@mui/material';

const Root = () => {
  const { checkAuthTokenProcess, status } = useAuthStore();

  // const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    checkAuthTokenProcess();
    // const splashTimeout = setTimeout(() => {
    //   setShowSplash(false);
    // }, 2500);
    // return () => clearTimeout(splashTimeout);
  }, []);

  if (status === authStatusEnum.INIT) {
    return <InitComponent />;
  }

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          overflowY: 'auto',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Root;
