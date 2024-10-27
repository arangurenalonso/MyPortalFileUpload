import { AxiosHttpClient } from '../utils/adpters/axios-http-client';
import getEnvVariable from '../utils/envs/enviroments';

const httpClient = new AxiosHttpClient(getEnvVariable().AUTH_API_URL!);

export type registerParams = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};

export type AuthenticationResponse = {
  isSuccess: boolean;
  message: string;
};
export type ValidTokenResponse = {
  isAuthenticated: boolean;
  message: string;
};
export type socialMediaProviderParams = {
  name: string;
  email: string;
  uid: string;
  provider: string;
  timeZone: string;
  photoURL?: string | null;
};
export const authApi = {
  login: async (email: string, password: string) => {
    const data = { email, password };
    return await httpClient.postJson<string>('/api/Auth/Login', data);
  },
  forgotPasswordProcess: async (email: string) => {
    const data = { email };
    return await httpClient.postJson<AuthenticationResponse>(
      '/api/Auth/ForgotPassword',
      data
    );
  },
  confirmEmail: async (token: string) => {
    const data = { token };
    return await httpClient.postJson<AuthenticationResponse>(
      '/api/Auth/EmailConfirmation',
      data
    );
  },

  resetPasswordProcess: async (
    token: string,
    password: string,
    confirmPassword: string
  ) => {
    const data = { token, password, confirmPassword };
    return await httpClient.postJson<AuthenticationResponse>(
      '/api/Auth/ResetPassword',
      data
    );
  },
  register: async (params: registerParams) => {
    const data = {
      email: params.email,
      password: params.password,
      confirmPassword: params.confirmPassword,
      firstName: params.firstName,
      lastName: params.lastName,
    };
    return await httpClient.postJson<AuthenticationResponse>(
      '/api/auth/register',
      data
    );
  },

  socialMediaProvider: async (params: socialMediaProviderParams) => {
    const data = {
      name: params.name,
      email: params.email,
      uid: params.uid,
      timeZone: params.timeZone,
      photoURL: params.photoURL,
    };
    return await httpClient.postJson<AuthenticationResponse>(
      `/api/auth/social-provider/${params.provider}`,
      data
    );
  },

  validateToken: async (token: string) => {
    const data = {
      token,
    };
    console.log('token', token);

    return await httpClient.postJson<AuthenticationResponse>(
      '/api/Auth/ValidateToken',
      data
    );
  },

  //   logout: async () => {
  //     return await httpClient.postJson('/auth/logout', {});
  //   },

  //   refreshToken: async () => {
  //     return await httpClient.postJson('/auth/refresh-token', {});
  //   },

  //   getUserProfile: async () => {
  //     return await httpClient.get('/auth/profile');
  //   },
};
