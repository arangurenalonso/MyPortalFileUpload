export type filestatus = 'Init' | 'loading' | 'Succes' | 'Error' | 'waiting';

export enum filesStatusEnum {
  ERROR = 'Error',
  INIT = 'Init',
  LOADING = 'loading',
  SUCCESS = 'Succes',
  WAITING = 'waiting',
}

export type FileType = {
  fileName: string;
  url: string;
  size: number;
  fileExtension: string;
};

export type FileState = {
  status: filestatus;
  files: FileType[] | null;
  errorMessage: string[] | null;
};

export const fileInitialState: FileState = {
  status: filesStatusEnum.INIT,
  files: null,
  errorMessage: null,
};
