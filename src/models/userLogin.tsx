export type UserLogin ={
    login:string;
    password:string;
}

export type Role = 'user' | 'admin';

export interface User {
  login: string;
  role: Role;
  token: string
}

export interface AuthContextType {
  user: User | null;
  login_: (UserLogin: UserLogin) => boolean | any;
  logout: () => void;
  isAuthenticated: boolean;
  msg: string
}