import { jwtDecode } from 'jwt-decode';

type JwtPayload = {
  username: string;
  userId: string;
  iat: number;
  exp: number;
};

export const decryptJwt = (token: string): JwtPayload | null => {
  try {
    return jwtDecode(token);
  } catch (e) {
    return null;
  }
};
