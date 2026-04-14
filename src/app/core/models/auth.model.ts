export interface AuthResponse {
  token: string;
  pseudo: string;
  id:string;
  roles: number;
}

export interface LoginRequest{
  pseudo: string;
  password: string;
}

export interface RegisterRequest{
  pseudo: string;
  email: string;
  password: string;
}
