import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { HttpError } from '../utils/adpters/axios-http-client';
import { fileApi } from '../api/file.api';
import {
  setFiles,
  onLogout,
  onLoading,
  onSetError,
  onClearError,
  setFile,
} from '../store/file/file.slice';

const useFileStore = () => {
  const dispatch: AppDispatch = useDispatch();
  const { status, files, errorMessage } = useSelector(
    (state: RootState) => state.files
  );

  const handleError = (errorData: HttpError | string) => {
    if (typeof errorData === 'string') {
      dispatch(onSetError([errorData]));
      return;
    }
    const errorFormat = errorData.errors.map(
      (error) => `${error.propertyName} - ${error.type}: ${error.description}`
    );
    dispatch(onSetError(errorFormat));

    setTimeout(() => {
      dispatch(onClearError());
    }, 5000);
  };

  const getAllFilesFromUserConnected = async () => {
    dispatch(onLoading());
    const userFilesResult = await fileApi.getAllFilesFromUserConnected();
    if (userFilesResult.isErr()) {
      const error = userFilesResult.error;
      handleError(error);
      return;
    }
    const files = userFilesResult.value;
    dispatch(setFiles(files));
  };
  const uploadExcel = async (file: File) => {
    dispatch(onLoading());
    const userFilesResult = await fileApi.uploadFile(file);
    if (userFilesResult.isErr()) {
      const error = userFilesResult.error;
      handleError(error);
      return false;
    }
    const fileValue = userFilesResult.value;
    dispatch(setFile(fileValue));
    return true;
  };
  const onLogOutFile = () => {
    dispatch(onLogout());
  };
  return {
    //*Properties
    status,
    files,
    errorMessage,
    //*Methods
    getAllFilesFromUserConnected,
    uploadExcel,
    onLogOutFile,
  };
};

export default useFileStore;
