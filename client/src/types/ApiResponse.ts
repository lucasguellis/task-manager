export type ApiResponse<T = undefined> = {
  success?: boolean;
  id?: string;
  message?: string;
  data?: T;
  status?: number;
};

export type LoginResponse = {
  data: { token: string };
  status: number;
};
