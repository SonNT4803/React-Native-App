import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  email: string;
  sub: number; // user id
  role: string[];
  iat: number;
  exp: number;
}

export const getUserFromToken = (token: string): DecodedToken | null => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

export const getUserId = (token: string): number | null => {
  const decoded = getUserFromToken(token);
  return decoded ? decoded.sub : null;
};

export const getUserEmail = (token: string): string | null => {
  const decoded = getUserFromToken(token);
  return decoded ? decoded.email : null;
};

export const getUserRoles = (token: string): string[] | null => {
  const decoded = getUserFromToken(token);
  return decoded ? decoded.role : null;
};

export const hasRole = (token: string, role: string): boolean => {
  const roles = getUserRoles(token);
  return roles ? roles.includes(role) : false;
};
