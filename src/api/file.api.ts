import { FileType } from '../store/file/file.initial-state';
import { AxiosHttpClient } from '../utils/adpters/axios-http-client';
import getEnvVariable from '../utils/envs/enviroments';

const httpClient = new AxiosHttpClient(getEnvVariable().AUTH_API_URL!);

export const fileApi = {
  getAllFilesFromUserConnected: async () => {
    return await httpClient.get<FileType[]>(`/api/User/Files`);
  },
  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append('Excel', file);

    return await httpClient.postFormData<FileType>(
      `api/BlobStorage/Excel`,
      formData
    );
  },
};
