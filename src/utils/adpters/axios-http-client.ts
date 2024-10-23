import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Result, err, ok } from 'neverthrow';
import LocalStorageEnum from '../../common/enum/localstorage.enum';

export type ErrorData = {
  propertyName: string;
  type: string;
  description: string;
};

export type HttpError = {
  statusCode: string;
  title: string;
  errors: ErrorData[];
};

export class AxiosHttpClient {
  private instance: AxiosInstance;

  constructor(baseUrl: string) {
    this.instance = axios.create({
      baseURL: baseUrl,
    });
    // Interceptor para agregar el token en cada solicitud
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem(LocalStorageEnum.TOKEN);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Interceptor para manejar errores de respuesta
  }
  async get<T>(
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<Result<T, HttpError>> {
    try {
      const response = await this.instance.get<T>(url, config);
      return ok(response.data);
    } catch (error) {
      return this.handleError(error);
    }
  }
  async getFile(
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<Result<Blob, HttpError>> {
    try {
      const response = await this.instance.get(url, {
        ...config,
        responseType: 'blob',
      });
      return ok(response.data);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async postJson<T>(
    url: string,
    data: any,
    config: AxiosRequestConfig = {}
  ): Promise<Result<T, HttpError>> {
    try {
      const response = await this.instance.post<T>(url, data, {
        ...config,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return ok(response.data);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async postFormData<T>(
    url: string,
    formData: FormData,
    config: AxiosRequestConfig = {}
  ): Promise<Result<T, HttpError>> {
    try {
      const response = await this.instance.post<T>(url, formData, {
        ...config,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return ok(response.data);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async put<T>(
    url: string,
    data: any,
    config: AxiosRequestConfig = {}
  ): Promise<Result<T, HttpError>> {
    try {
      const response = await this.instance.put<T>(url, data, config);
      return ok(response.data);
    } catch (error) {
      return this.handleError(error);
    }
  }
  async delete<T>(
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<Result<T, HttpError>> {
    try {
      const response = await this.instance.delete<T>(url, config);
      return ok(response.data);
    } catch (error) {
      return this.handleError(error);
    }
  }
  private handleError(error: unknown): Result<never, HttpError> {
    console.error('Error detected:', error);

    // Verifica si el error es de Axios
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      const errorData = error.response.data || {};

      const httpError: HttpError = {
        statusCode: status.toString(),
        title: errorData.title || this.getErrorTitleByStatus(status),
        errors: errorData.errors || [
          {
            propertyName: '',
            type: this.getErrorTypeByStatus(status),
            description: this.getErrorDescriptionByStatus(status),
          },
        ],
      };

      return err(httpError);
    }

    // Manejo de errores internos del servidor
    return err({
      statusCode: '500',
      title: 'Internal Server Error',
      errors: [
        {
          propertyName: '',
          type: 'InternalServerError',
          description: 'An unexpected error occurred. Please try again later.',
        },
      ],
    });
  }

  // Métodos auxiliares para mensajes personalizados por código de estado
  private getErrorTitleByStatus(status: number): string {
    switch (status) {
      case 401:
        return 'Unauthorized';
      case 403:
        return 'Forbidden';
      default:
        return 'Error';
    }
  }

  private getErrorTypeByStatus(status: number): string {
    switch (status) {
      case 401:
        return 'UnauthorizedError';
      case 403:
        return 'ForbiddenError';
      default:
        return 'Error';
    }
  }

  private getErrorDescriptionByStatus(status: number): string {
    switch (status) {
      case 401:
        return 'You are not authorized to access this resource.';
      case 403:
        return 'You do not have permission to access this resource.';
      default:
        return 'An unexpected error occurred.';
    }
  }
}
