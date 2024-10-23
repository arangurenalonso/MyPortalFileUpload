import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fileInitialState,
  FileType,
  filesStatusEnum,
} from './file.initial-state';

export const fileSlice = createSlice({
  name: 'file',
  initialState: fileInitialState,
  reducers: {
    setFiles: (state, action: PayloadAction<FileType[]>) => {
      const file = action.payload;
      state.status = filesStatusEnum.SUCCESS;
      state.files = file;
      state.errorMessage = null;
    },
    setFile: (state, action: PayloadAction<FileType>) => {
      const file = action.payload;
      state.status = filesStatusEnum.SUCCESS;
      state.files = [...(state.files || []), file];
      state.errorMessage = null;
    },
    onLogout: (state) => {
      state.status = filesStatusEnum.INIT;
      state.files = null;
      state.errorMessage = null;
    },
    onLoading: (state) => {
      state.status = filesStatusEnum.LOADING;
      state.errorMessage = null;
    },
    onSetError: (state, action: PayloadAction<string[]>) => {
      state.status = filesStatusEnum.ERROR;
      state.errorMessage = action.payload;
    },
    onClearError: (state) => {
      state.errorMessage = null;
      state.status = filesStatusEnum.WAITING;
    },
  },
});

export const {
  setFiles,
  setFile,
  onLogout,
  onLoading,
  onSetError,
  onClearError,
} = fileSlice.actions;
