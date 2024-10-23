import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/auth.slice';
import { themeSlice } from './theme/theme.slice';
import { fileSlice } from './file/file.slice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    theme: themeSlice.reducer,
    files: fileSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
