import fetchClient from '../clients/fetch';
import { UserCredentials } from '../src/types/UserCredentials.ts';
import { Task } from '../src/types/Task.ts';
import { AxiosResponse } from 'axios';
import { ApiResponse, LoginResponse } from '../src/types/ApiResponse.ts';
import { User } from '../src/types/User.ts';

export const register = (payload: UserCredentials): Promise<AxiosResponse<ApiResponse>> => fetchClient(`/register`, { method: 'POST', data: payload });
export const login = (payload: UserCredentials): Promise<LoginResponse> => fetchClient(`/login`, { method: 'POST', data: payload });
export const getAllUsers = (): Promise<AxiosResponse<ApiResponse<User[]>>> => fetchClient(`/users`);
export const getUserById = (id: string): Promise<AxiosResponse<ApiResponse<User>>> => fetchClient(`/user/${id}`);
export const getTasksByUserId = (userId: string): Promise<AxiosResponse<ApiResponse<Task[]>>> => fetchClient(`/api/tasks/${userId}`);
export const createTask = (payload: Task): Promise<AxiosResponse<ApiResponse>> => fetchClient(`/api/tasks`, { method: 'POST', data: payload });
export const updateTask = (id: string, payload: Task): Promise<AxiosResponse<ApiResponse>> => fetchClient(`/api/tasks/${id}`, { method: 'PUT', data: payload });
export const deleteTask = (id: string): Promise<AxiosResponse<ApiResponse>> => fetchClient(`/api/tasks/${id}`, { method: 'DELETE' });

const apis = {
  register,
  login,
  getAllUsers,
  getUserById,
  getTasksByUserId,
  createTask,
  updateTask,
  deleteTask,
};

export default apis;
