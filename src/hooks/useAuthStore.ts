import { useDispatch, useSelector } from 'react-redux';
import {
  onChecking,
  onClear,
  onLogout,
  onSetError,
  onSetRedirectPath,
  setUser,
} from '../store/auth/auth.slice';
import { authApi, registerParams } from '../api/auth.api';
import { jwtDecode } from 'jwt-decode';
import { UserPayLoad } from '../store/auth/auth.initial-state';
import { AppDispatch, RootState } from '../store/store';
import { HttpError } from '../utils/adpters/axios-http-client';
import LocalStorageEnum from '../common/enum/localstorage.enum';
// import { FirebaseAuth } from '../firebase/firebase.config';
// import {
//   signInWithPopup,
//   GoogleAuthProvider,
//   UserCredential,
// } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import useFileStore from './useFileStore';

// const googleProvider = new GoogleAuthProvider();
// googleProvider.setCustomParameters({
//   prompt: 'select_account',
// });

const useAuthStore = () => {
  const dispatch: AppDispatch = useDispatch();
  const { status, user, isLogged, errorMessage, redirectPath } = useSelector(
    (state: RootState) => state.auth
  );
  const { onLogOutFile } = useFileStore();
  const navigate = useNavigate();

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
      dispatch(onClear());
    }, 5000);
  };
  const confirmEmail = async (token: string) => {
    dispatch(onChecking());
    const authenticationResult = await authApi.confirmEmail(token);
    if (authenticationResult.isErr()) {
      const error = authenticationResult.error;
      handleError(error);
      return;
    }
    dispatch(onClear());
  };
  const signInProcess = async (email: string, password: string) => {
    dispatch(onChecking());
    const authenticationResult = await authApi.login(email, password);
    if (authenticationResult.isErr()) {
      const error = authenticationResult.error;
      handleError(error);
      return;
    }
    const accessToken = authenticationResult.value;

    await decodeToken(accessToken);
  };

  const forgotPasswordProcess = async (email: string) => {
    dispatch(onChecking());
    const authenticationResult = await authApi.forgotPasswordProcess(email);
    if (authenticationResult.isErr()) {
      const error = authenticationResult.error;
      handleError(error);
      return false;
    }
    navigate(`/auth/password-reset-link-sent?email=${email}`, {
      state: { replace: true },
    });
    dispatch(onClear());
  };
  const resetPasswordProcess = async (
    token: string,
    password: string,
    confirmPassword: string
  ) => {
    dispatch(onChecking());
    const authenticationResult = await authApi.resetPasswordProcess(
      token,
      password,
      confirmPassword
    );
    if (authenticationResult.isErr()) {
      const error = authenticationResult.error;
      handleError(error);
      return false;
    }
    navigate(`/auth/reset-password/successfully`, {
      state: { replace: true },
    });
    dispatch(onClear());
  };
  // const signInGoogleProcess = async (timezone: string) => {
  // let userCredential: UserCredential;
  // try {
  //   const result = await signInWithPopup(FirebaseAuth, googleProvider);
  //   userCredential = result;
  // } catch (error) {
  //   console.log('ERRORRRRRRRRRRRR al authentcar con google', error);
  //   return;
  // }
  // const { displayName, email, photoURL, uid } = userCredential.user;
  // const authenticationResult = await authApi.socialMediaProvider({
  //   name: displayName || '',
  //   email: email! || '',
  //   uid,
  //   provider: 'Google',
  //   timeZone: timezone,
  //   photoURL,
  // });
  // if (authenticationResult.isErr()) {
  //   const error = authenticationResult.error;
  //   console.log('error', error);
  //   handleDecodingError(error.error);
  //   return;
  // }
  // const authenticationResponse = authenticationResult.value;
  // const accessToken = authenticationResponse.accessToken;
  // await decodeToken(accessToken);
  // };

  const registerProcess = async (params: registerParams) => {
    dispatch(onChecking());
    const authenticationResult = await authApi.register(params);
    if (authenticationResult.isErr()) {
      const error = authenticationResult.error;
      handleError(error);
      return;
    }
    navigate(`/auth/register-confirmation`, {
      state: { replace: true },
    });
    dispatch(onClear());
  };

  const checkAuthTokenProcess = async () => {
    const accessToken = localStorage.getItem(LocalStorageEnum.TOKEN);
    if (!accessToken) {
      dispatch(onLogout());
      return;
    }
    const validTokenResponseResult = await authApi.validateToken(accessToken);
    if (validTokenResponseResult.isErr()) {
      logOutProcess();
      // const error = validTokenResponseResult.error;
      // handleError(error);
      return;
    }
    const validTokenResponse = validTokenResponseResult.value;
    if (validTokenResponse.isSuccess) {
      await decodeToken(accessToken);
    }
  };

  const logOutProcess = () => {
    dispatch(onLogout());
    onLogOutFile();
    localStorage.removeItem(LocalStorageEnum.TOKEN);
    localStorage.removeItem(LocalStorageEnum.TOKEN_INIT);
    localStorage.clear();
  };

  const setRedirectPath = (fullPathName: string | null) => {
    dispatch(onSetRedirectPath(fullPathName));
  };

  const decodeToken = async (accessToken: string) => {
    try {
      const decodedToken = jwtDecode<UserPayLoad>(accessToken);
      localStorage.setItem(LocalStorageEnum.TOKEN, accessToken);
      localStorage.setItem(
        LocalStorageEnum.TOKEN_INIT,
        new Date().getTime().toString()
      );
      dispatch(setUser(decodedToken));
      if (redirectPath) {
        navigate(redirectPath, {
          state: { replace: true },
        });
        onSetRedirectPath(null);
      }
    } catch (error) {
      console.error('Error decoding the token:', error);
      handleError(
        `Error decoding the token, please contact IT support. ${error}}`
      );
      return;
    }
  };

  return {
    //*Properties
    status,
    user,
    errorMessage,
    isLogged,
    redirectPath,
    //*Methods
    signInProcess,
    confirmEmail,
    forgotPasswordProcess,
    resetPasswordProcess,
    registerProcess,
    checkAuthTokenProcess,
    logOutProcess,
    setRedirectPath,
    // signInGoogleProcess,
  };
};

export default useAuthStore;
