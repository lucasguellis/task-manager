import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface FetchClientOptions extends AxiosRequestConfig {}

const fetchClient = async (
  url: string,
  options?: FetchClientOptions,
): Promise<AxiosResponse<any>> => {
  const clientToken = localStorage.getItem('token');

  const defaultOptions: FetchClientOptions = {
    baseURL: 'http://localhost:3000',
    method: 'get',
    headers: {
      Authorization: `Bearer ${clientToken}`,
      'Content-Type': 'application/json',
    },
    ...options,
  };

  const instance = axios.create(defaultOptions);

  return instance(url, options);
};

export default fetchClient;
