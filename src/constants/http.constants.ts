import { AxiosRequestConfig } from 'axios';

/** Default timeout we use for HttpService calls (in milliseconds) */
export const HTTP_TIMEOUT_DEFAULT = 2 * 1000;

export const HTTP_CONFIG_DEFAULT: AxiosRequestConfig = {
  timeout: HTTP_TIMEOUT_DEFAULT,
};
