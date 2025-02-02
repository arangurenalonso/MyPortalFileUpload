import { Outlet } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import LoadingOverlay from '../../common/components/LoadingOverlay';
import useAuthStore from '../../hooks/useAuthStore';
import { authStatusEnum } from '../../store/auth/auth.initial-state';

const AuthContainer = () => {
  const { status } = useAuthStore();
  return (
    <>
      <AuthLayout>
        <Outlet />
      </AuthLayout>
      <LoadingOverlay isLoading={status === authStatusEnum.CHECKING} />
    </>
  );
};

export default AuthContainer;
