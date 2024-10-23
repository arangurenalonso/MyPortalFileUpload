import { Outlet } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import useFileStore from '../../hooks/useFileStore';
import { filesStatusEnum } from '../../store/file/file.initial-state';
import LoadingOverlay from '../../common/components/LoadingOverlay';
import { useEffect } from 'react';

const MainContainer = () => {
  const { status, getAllFilesFromUserConnected } = useFileStore();
  useEffect(() => {
    getAllFilesFromUserConnected();
  }, []);
  return (
    <>
      <MainLayout>
        <Outlet />
        <LoadingOverlay isLoading={status === filesStatusEnum.LOADING} />
      </MainLayout>
    </>
  );
};

export default MainContainer;
